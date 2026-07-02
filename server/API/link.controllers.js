import admin from "firebase-admin";
import { SupabaseConnect } from "../db/supabaseClient.js";
import { json } from "express";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { redisClient } from "../redisClient.js"



const getCurrentDay = () =>
    new Date().toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "Asia/Manila"
    });

const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Manila"
    });
};


// SAVE LINK (CREATE)
export const SaveLinks = async (req, res) => {
    try {

        const proxyIp = req.ip;

        const forwardedFor = req.headers['x-forwarded-for'];
        const realIp = forwardedFor ? forwardedFor.split(',')[0] : proxyIp;



        function generateCode() {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let code = "";

            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                code += chars[randomIndex];
            }

            return code;
        }

        const codeKey = generateCode();

        const firebaseUID = req.user.uid
        const firebaseName = req.user.name || req.user.email || "Anonymous User";

        const { Links, Title } = req.body;

        if (!Links || !Array.isArray(Links)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Data format."
            });
        }

        const isValidTime = (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

        const validDays = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];

        if (!Title || Title.length <= 1) {
            return res.status(400).json({
                message: "Invalid Title",
                success: false
            });
        }

        const isValid = Links.every((item) => {
            return (
                item.title &&
                item.title.length > 1 &&
                item.title.length < 50 &&

                item.link &&
                item.link.startsWith("https://") &&

                validDays.includes(item.day) &&

                item.time &&
                isValidTime(item.time)

            );
        });

        if (!isValid) {
            return res.status(400).json({
                message: "Invalid Link Data",
                success: false
            });
        }

        const linksToInsert = Links.map(item => ({
            title: item.title,
            links: item.link?.trim(),
            day: item.day,
            time: item.time,
            uid: firebaseUID,
            name: firebaseName,
            code: codeKey,
            schedule_name: Title
        }));

        const { data, error } = await SupabaseConnect
            .from("Links")
            .insert(linksToInsert)
            .select();

        if (error) {
            console.log("SUPABASE ERROaR:", error);
            return res.status(500).json({ success: false, message: error.message });
        }

        const firebaseEmail = req.user?.email;

        console.log("=============================SAVE LINK==========================================");
        console.log("Headers: ", req.headers);
        console.log("user-agents: ", req.headers['user-agent']);
        console.log("forward: ", forwardedFor)
        console.log("Internal Proxy IP:", proxyIp);
        console.log("User Public IP:", realIp);
        console.log("Firebase UID: ", firebaseUID)
        console.log("Firebase Name: ", firebaseName)
        console.log("Firebase Email: ", firebaseEmail)
        console.log("Created Links: ", Links.map((item => item.link)))
        console.log("Date Created: ", new Date().toLocaleDateString("en-US",
            {
                weekday: "long",
                timeZone: "Asia/Manila"
            }))
        console.log("Time Created: ", new Date().toLocaleTimeString("en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Asia/Manila"
            }))

        console.log("=================================================================================");

        return res.status(200).json({ success: true, data: data });

    } catch (error) {
        console.error("❌ Controller Error man:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

//FETCHING LINK
export const GetLinks = async (req, res) => {
    try {
        const uid = req.user?.uid;

        if (!uid) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const cacheKey = `links:${uid}`
        const cached = await redisClient.get(cacheKey)

        if (cached) {
            console.log("SOURCE GETLINK: CACHE");

            return res.status(200).json({
                message: "nakuha yung links (cache)",
                success: true,
                link: JSON.parse(cached),
            });
        }
        const { data, error } = await SupabaseConnect
            .from("Links")
            .select("title, links, day, time, code, schedule_name, id")
            .eq("uid", uid);


        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }


        if (data && data.length > 0) {
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
        }


        console.log("SOURCE GETLINK: SUPABASE");
        return res.status(200).json({
            message: "nakuha yung links",
            success: true,
            link: data,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

//CHECKING FEEDBACK
export const CheckFeedBack = async (req, res) => {
    const firebaseID = req.user?.uid;

    if (!firebaseID) {
        return res.status(401).json({ success: false });
    }

    const cachekey = `links:${firebaseID}`
    const cache = await redisClient.get(cachekey)

    console.log("FEEDBACK CACHE")

    if (cache) {
        return res.status(200).json({
            message: "MAY LAMAN",
            data: JSON.parse(cache),
            success: true,
        })
    }

    const { data, error } = await SupabaseConnect
        .from("feedback")
        .select("uid")
        .eq("uid", firebaseID)

    if (error) {
        return res.status(500).json({ success: false, error });
    }

    if (data && data.length > 0) {
        return res.json({
            success: false,
        });
    }

    return res.status(200).json({
        success: true,
    });
};

//AI ASK
export const AskGemini = async (req, res) => {
    try {
        const { prompt } = req.body;

        const firebaseUID = req.user?.uid;
        const firebaseName = req.user?.name;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Walang prompt na pinadala!"
            });
        }



        const systemPrompt = `
        Ikaw si Klei Moretti, AI assistant ng SmartLink.

        Task:
        Kapag ang user ay nagbigay ng schedule, i-extract mo ang data at i-return mo LANG sa JSON format.
        kapag hindi about sa schdule ang tanong huwag sumagot.

        Format:
        {
        "title": "",
        "link": "",
        "day": "",
        "time": ""
            }

        Rules:
        - JSON ONLY ang output.
        - Huwag mag explain.
        - Kung kulang ang data, ilagay "null".
        - Ayusin mo ang formatting ng schedule.
        - Maging helpful at precise.
        - Gawing Uppercase ang first letter ng Day
        - Sa time gawin mong military time
        - do NOT change meaning
        - do NOT extract single time
        - sa time Output ONLY  HH:MM format
        - No text, no explanation, no symbols
        - If schedule is example "13:00-16:00", return only "13:00"
        - If no time found, return null
        `;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result = await model.generateContent(`${systemPrompt}User input:${prompt}`);

        const response = await result.response;

        let text = response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        let parsed = null;
        try {
            parsed = JSON.parse(text);
        } catch (err) {
            console.warn("Hindi JSON ang response:", text);
        }

        console.log(text);


        if (!Array.isArray(parsed)) {
            parsed = [parsed];
        }

        function generateCode() {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let code = "";

            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                code += chars[randomIndex];
            }

            return code;
        }

        const codeKey = generateCode();

        const formattedSchedule = parsed.map((item) => ({
            uid: firebaseUID,
            name: firebaseName,
            schedule_name: "Untitled" || "Untitled",
            code: codeKey,
            title: item.title || null,
            links: item.link || null,
            day: item.day || null,
            time: item.time || null
        }));

        const { data, error } = await SupabaseConnect
            .from("Links")
            .insert(formattedSchedule);

        if (error) {
            console.log("Supabase insert error:", error);
        }

        return res.status(200).json({
            success: true,
            raw: text,
            data: parsed
        });

    } catch (error) {
        console.error("Gemini Error:", error);

        return res.status(500).json({
            success: false,
            message: "Gemini API error"
        });
    }
};

//SAVING EDIT
export const SaveEdit = async (req, res) => {
    const { editedLinks } = req.body;

    const firebaseUID = req.user.uid;

    if (!Array.isArray(editedLinks) || editedLinks.length === 0) {
        return res.status(400).json({
            message: "No data"
        });
    }

    for (const item of editedLinks) {
        if (
            !item.id ||
            !item.title ||
            !item.links ||
            !item.day ||
            !item.time
        ) {
            return res.status(400).json({
                message: "Missing required fields",
                item
            });
        }
    }

    try {
        const results = await Promise.all(
            editedLinks.map(async (item) => {
                const { data, error } = await SupabaseConnect
                    .from("Links")
                    .update({
                        title: item.title,
                        links: item.links,
                        day: item.day,
                        time: item.time
                    })
                    .eq("id", item.id)
                    .eq("uid", firebaseUID);

                if (error) {
                    throw error;
                }

                return data;
            })
        );

        return res.status(200).json({
            message: "Updated successfully",
            results
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

//SAVING ROW
export const SaveRow = async (req, res) => {
    const { AddRow, code, schedule_name } = req.body;
    const firebaseUID = req.user?.uid;
    const firebaseName = req.user?.name;
    console.log(firebaseName)

    try {
        await Promise.all(
            AddRow.map(async (item) => {
                const { error } = await SupabaseConnect
                    .from("Links")
                    .insert({
                        title: item.title,
                        links: item.links,
                        day: item.day,
                        time: item.time,
                        code: code,
                        schedule_name: schedule_name,
                        uid: firebaseUID,
                        name: firebaseName,
                    });

                if (error) throw error;
            })
        );

        return res.status(200).json({
            message: "Rows saved successfully.",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

//Redirect
export const Redirect = async (req, res) => {
    try {
        const { code } = req.params;

        const currentDay = getCurrentDay();
        const currentTime = getCurrentTime();

        console.log(`Checking link for code: ${code} at ${currentDay} ${currentTime}`);

        const { data, error } = await SupabaseConnect
            .from("Links")
            .select("links")
            .eq("code", code)
            .eq("day", currentDay)
            .lte("time", currentTime)
            .order("time", { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error || !data) {
            return res.status(404).json({
                success: false,
                message: "Link not found or not active"
            });
        }

        return res.status(200).json({
            success: true,
            link: data
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

//DElETE EDIT
export const DeleteEdit = async (req, res) => {
    try {
        const { rowID } = req.body;
        const uid = req.user?.uid;

        const cacheKey = `links:${uid}`;
        await redisClient.del(cacheKey);

        await SupabaseConnect
            .from("Links")
            .delete()
            .eq("id", rowID)
            .eq("uid", uid)

        console.log("DELETE", rowID);

        return res.status(200).json({
            success: true,
            message: "Deleted successfully",
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


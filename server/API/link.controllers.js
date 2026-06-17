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

export const SaveLinks = async (req, res) => {
    try {

        const proxyIp = req.ip;

        const forwardedFor = req.headers['x-forwarded-for'];
        const realIp = forwardedFor ? forwardedFor.split(',')[0] : proxyIp;

        console.log("Headers: ", req.headers);

        console.log("user-agents: ", req.headers['user-agent']);
        console.log("forward: ", forwardedFor)
        console.log("Internal Proxy IP:", proxyIp);
        console.log("User Public IP:", realIp);


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

        return res.status(200).json({ success: true, data: data });

    } catch (error) {
        console.error("❌ Controller Error man:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

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
        console.log("cahed key GETLINK", cached)



        if (cached) {
            console.log("GETLINK: CACHE");

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

export const DeleteLink = async (req, res) => {
    try {
        const uid = req.user?.uid;

        if (!uid) {
            return res.status(401).json({
                message: "INVALID CREDENTIALS",
                success: false
            });
        }

        const { LinksID } = req.body;

        if (!Number.isInteger(LinksID) || LinksID <= 0) {
            return res.status(400).json({
                message: "invalid id",
                success: false
            });
        }

        const { error } = await SupabaseConnect
            .from("Links")
            .delete()
            .eq("id", LinksID)
            .eq("uid", uid);

        if (error) {
            return res.status(404).json({
                message: "not found",
                success: false
            });
        }

        const cacheKey = `links:${uid}`;
        await redisClient.del(cacheKey);

        console.log("CACHE [DELETE]");

        return res.status(200).json({
            message: "success",
            success: true
        });

    } catch (err) {
        console.log("error sa Delete: ", err);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const EditTable = async (req, res) => {
    try {
        if (!req.user || !req.user.uid) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const uid = req.user.uid;
        const { editTable } = req.body;

        if (!editTable) {
            return res.status(400).json({ message: "No data" });
        }

        const isValidTime = (time) =>
            /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

        const orderDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const dayCheck = (day) => orderDay.includes(day);


        const title = editTable.title?.trim();
        const link = editTable.link?.trim();
        const time = editTable.time?.trim();
        const day = editTable.day;

        // 🔥 OPTIONAL FIELD LOGIC
        if (
            (title && title.length < 1) ||
            (link && !link.startsWith("https://")) ||
            (time && !isValidTime(time)) ||
            (day && !dayCheck(day))
        ) {
            return res.status(400).json({
                success: false,
                message: "failed boss"
            });
        }





        const { data, error } = await SupabaseConnect
            .from("Links")
            .update({
                title: editTable.title,
                links: editTable.link?.trim(),
                day: editTable.day,
                time: editTable.time,
            })
            .eq("uid", uid)
            .eq("id", editTable.id);

        await redisClient.del(`links:${uid}`);

        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "saved",
            link: data,
        });


    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

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

export const SaveLinkRow = async (req, res) => {
    try {

        const firebaseUID = req.user.uid;
        if (!firebaseUID) return res.status(401).json({ message: "you are not logged", success: false })

        const firebaseName = req.user.name || req.user.email || "Anonymous User";

        const { saveRow, saveCode, saveTitle } = req.body;

        if (!saveRow || !Array.isArray(saveRow)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Data format."
            });
        }

        const isValidTime = (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

        const validDays = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];


        const isValid = saveRow.every((item) => {
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

        const linksToInsert = saveRow.map(item => ({
            title: item.title,
            links: item.link?.trim(),
            day: item.day,
            time: item.time,
            uid: firebaseUID,
            name: firebaseName,
            code: saveCode,
            schedule_name: saveTitle,
        }));

        const { data, error: insertError } = await SupabaseConnect
            .from("Links")
            .insert(linksToInsert)
            .select();

        if (insertError) {
            console.log("SUPABASE ERROR:", insertError);
            return res.status(500).json({
                success: false,
                message: insertError.message
            });
        }
        await redisClient.del(`links:${firebaseUID}`);

        const firebaseEmail = req.user?.email;

        console.log(firebaseUID, firebaseName, firebaseEmail, " Created Links ", saveRow.map((item => item.link)))


        return res.status(200).json({ success: true, data: data });

    } catch (error) {
        console.error("❌ Controller Error man:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const SaveTitle = async (req, res) => {
    if (!req.user.uid) return res.status(401).json({ success: false })


    const { saveTitle } = req.body;
    const firebaseUID = req.user.uid;

    if (saveTitle === "") return res.status(401).json({ success: false })

    const cachekey = `links:${firebaseUID}`

    await redisClient.del(cachekey)
    console.log("Cache Title Save");



    const { data, error } = await SupabaseConnect
        .from("Links")
        .update({ schedule_name: saveTitle })
        .eq("uid", firebaseUID);

}

export const FeedBack = async (req, res) => {
    const firebaseUID = req.user?.uid;
    const firebaseName = req.user?.displayName;
    const { emoji, message } = req.body;


    if (!emoji) {
        return res.status(400).json({ success: false, message: "Emoji is required" });
    }

    const { data: checkExist, error: errorExist } = await SupabaseConnect
        .from("feedback")
        .select("uid")
        .eq("uid", firebaseUID)

    if (errorExist) {
        console.error("Supabase Error:", ErrorSend);
        return res.status(500).json({ success: false, error: ErrorSend.message });
    }

    if (checkExist && checkExist.length > 0) {
        return res.status(400).json({ success: false, message: "Feedback already submitted." });
    }

    const { data: sendFeedBack, error: ErrorSend } = await SupabaseConnect
        .from("feedback")
        .insert([{
            "uid": firebaseUID,
            "name": firebaseName,
            "emotion": emoji,
            "message": message,
        }]);

    if (ErrorSend) {
        console.error("Supabase Error:", ErrorSend);
        return res.status(500).json({ success: false, error: ErrorSend.message });
    }

    return res.status(200).json({ success: true });
};

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

export const AskGemini = async (req, res) => {
    try {
        const { prompt, titleSched } = req.body;



        const firebaseUID = req.user?.uid;
        const firebaseName = req.user?.displayName;

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
        console.log(titleSched)


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
            schedule_name: titleSched ?? "Untitled Schedule",
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
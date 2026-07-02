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
            console.log(error.message)
            return res.status(500).json({
                success: false,
                message: "Error",
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
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

//AI ASK
export const AskGemini = async (req, res) => {
    try {

        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Walang prompt na pinadala!"
            });
        }

        if (prompt.length > 10000) {
            return res.status(400).json({ success: false, message: "Number of characters reach the limits" });
        }

        const firebaseUID = req.user?.uid;
        const firebaseName = req.user?.name;
        const firebaseEmail = req.user?.email;


        await redisClient.del(`links:${firebaseUID}`);

        const systemPrompt = `
        Ikaw si Lyncks, AI assistant ng Lyncks.

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
        - If you notice time typo error auto correct example 10:)0 AM Make it 10:00 AM
        `;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: systemPrompt,
        });

        const result = await model.generateContent(prompt);

        const response = await result.response;

        let text = response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        let parsed = null;
        try {
            parsed = JSON.parse(text);
        } catch (err) {
            console.warn("Hindi JSON ang response:", text);
        }

        console.log("UID: ", firebaseUID);
        console.log("firstname: ", firebaseEmail);
        console.log("firstname: ", firebaseName);
        console.log("IP: ", req.ip);
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
            schedule_name: "Schedule",
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
            console.error("Supabase insert error:", error);
            return res.status(500).json({ success: false, message: "Error While Saving..." });
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

    const cacheKey = `links:${firebaseUID}`;
    await redisClient.del(cacheKey);

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


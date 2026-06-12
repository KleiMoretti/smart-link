import admin from "firebase-admin";

import { SupabaseConnect } from "../db/supabaseClient.js";
import e from "express";

export const SaveLinks = async (req, res) => {
    try {

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

        console.log(firebaseUID, firebaseName, firebaseEmail, " Created Links ", Links.map((item => item.link)))


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
            (title && !title) ||
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

export const DeleteLink = async (req, res) => {
    try {
        if (!req.user?.uid) return res.status(401).json({ message: "INVALID CREDENTIALS", success: false });

        const { LinksID } = req.body;

        if (!Number.isInteger(LinksID) || LinksID <= 0) {
            return res.status(400).json({
                message: "invalid id",
                success: false
            });
        }

        const uid = req.user?.uid;

        const { data, error } = await SupabaseConnect
            .from("Links")
            .delete()
            .eq("id", LinksID)
            .eq("uid", uid)

        if (error) return res.status(404).json({ message: "not found", success: false })

        else res.status(200).json({ message: "success", success: true })

    } catch (err) {
        console.log("error sa Delete: ", err);
    }
}

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

    const { data, error } = await SupabaseConnect
        .from("Links")
        .update({ schedule_name: saveTitle })
        .eq("uid", firebaseUID);
}

export const FeedBack = async (req, res) => {
    const firebaseUID = req.user?.uid;
    const firebaseName = req.user?.name;
    const { emoji, message } = req.body;


    if (!emoji) {
        return res.status(400).json({ success: false, message: "Emoji is required" });
    }

    const { data, error } = await SupabaseConnect
        .from("feedback")
        .insert([{
            "uid": firebaseUID,
            "name": firebaseName,
            "emotion": emoji,
            "message": message,
        }]);

    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, data });
};
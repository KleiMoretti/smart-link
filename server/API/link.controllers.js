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

        console.log("Fetching links for UID:", req.user?.uid); // Debugging

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
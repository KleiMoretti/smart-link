import SupabaseConnect from "../db/supabaseClient.js";
import admin from "firebase-admin";



export const SaveLinks = async (req, res) => {
    try {

        const firebaseUID = req.user.uid
        const firebaseName = req.user.name || req.user.email || "Anonymous User";

        const { Links } = req.body;

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
            links: item.link,
            day: item.day,
            time: item.time,
            uid: firebaseUID,
            name: firebaseName
        }));

        const { data, error } = await SupabaseConnect
            .from("Links")
            .insert(linksToInsert)
            .select();
        //aaa
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
        const uid = req.user.uid;

        const { data, error } = await SupabaseConnect
            .from("Links")
            .select("title, links, day, time")
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
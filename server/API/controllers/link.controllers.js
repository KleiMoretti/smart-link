import SupabaseConnect from "../../db/supabaseClient.js";
import admin from "firebase-admin";

export const SaveLink = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = await admin.auth().verifyIdToken(token);

        if (!decodedToken) {
            return res.status(401).json({ success: false, message: "Invalid token." });
        }

        const firebaseUID = decodedToken.uid;
        const firebaseName = decodedToken.name || decodedToken.email || "Anonymous User";

        const { Links } = req.body;
        if (!Links || !Array.isArray(Links)) {
            return res.status(400).json({ success: false, message: "Invalid data format." });
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

        if (error) {
            console.log("SUPABASE ERROR:", error);
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, data: data });

    } catch (error) {
        console.error("❌ Controller Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
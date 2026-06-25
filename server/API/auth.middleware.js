import admin from "firebase-admin";

export const Middleware = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        const token = header.split(" ")[1];

        const decoded = await admin.auth().verifyIdToken(token);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

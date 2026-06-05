import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import authRoutes from "./API/auth.routes.js";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use("/api", authRoutes);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
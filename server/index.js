import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import authRoutes from "./API/auth.routes.js";
import { Redirect } from "./API/link.controllers.js";

// 1. I-load ang service account mula sa environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();

// 2. Gawing dynamic ang CORS para gumana sa kahit anong domain
app.use(cors({
    origin: process.env.FRONTEND_URL || process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

app.use("/api", authRoutes);

app.get("/:code", Redirect);

// 3. Gamitin ang PORT na ibibigay ng Render, o 5000 kung local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
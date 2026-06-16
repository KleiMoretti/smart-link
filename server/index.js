import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import authRoutes from "./API/auth.routes.js";
import { Redirect } from "./API/link.controllers.js";
import { redisClient } from "./redisClient.js"

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.set('trust proxy', 1);

app.use(cors({
    origin: process.env.FRONTEND_URL || process.env.FRONTEND_URL,
    methods: ["DELETE", "PUT", "GET", "POST", "UPDATE"],
    credentials: true
}));

await redisClient.connect()

app.use(express.json());

app.use("/api", authRoutes);

app.get("/:code", Redirect);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
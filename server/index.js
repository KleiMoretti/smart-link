import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import authRoutes from "./API/routes/auth.routes.js";

import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", authRoutes);

app.listen(5000)
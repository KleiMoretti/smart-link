// API/auth.routes.js
import express from "express";
import {
    GetLinks,
    AskGemini, SaveEdit,
    SaveRow, DeleteEdit
} from "./link.controllers.js";
import { Middleware } from "./auth.middleware.js";
import { RequestRL, AI } from "./RateLimit.js"

const route = express.Router();

route.get("/GetLinks", Middleware, RequestRL, GetLinks);
route.post("/ask-gemini", Middleware, AI, AskGemini);
route.post("/saveedit", Middleware, RequestRL, SaveEdit);
route.post("/SaveRow", Middleware, RequestRL, SaveRow);
route.post("/deleteedit", Middleware, DeleteEdit);



export default route;
// API/auth.routes.js
import express from "express";
import {
    SaveLinks, GetLinks,
    AskGemini, SaveEdit,
    SaveRow, DeleteEdit
} from "./link.controllers.js";
import { Middleware } from "./auth.middleware.js";
import { RequestRL } from "./RateLimit.js"

const route = express.Router();

route.post("/SaveLinks", Middleware, SaveLinks);
route.get("/GetLinks", Middleware, GetLinks);
route.post("/ask-gemini", Middleware, AskGemini);
route.post("/saveedit", Middleware, SaveEdit);
route.post("/SaveRow", Middleware, SaveRow);
route.post("/deleteedit", Middleware, DeleteEdit);



export default route;
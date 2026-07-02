// API/auth.routes.js
import express from "express";
import {
    SaveLinks, GetLinks,
    EditTable, DeleteLink,
    SaveLinkRow, SaveTitle,
    FeedBack, CheckFeedBack,
    AskGemini, SaveEdit, SaveRow
} from "./link.controllers.js";
import { Middleware } from "./auth.middleware.js";
import { RequestRL } from "./RateLimit.js"

const route = express.Router();

route.post("/SaveLinks", Middleware, SaveLinks);
route.get("/GetLinks", Middleware, RequestRL, GetLinks);
route.post("/edittable", Middleware, EditTable);
route.post("/deletelink", Middleware, DeleteLink);
route.post("/savelinkrow", Middleware, SaveLinkRow);
route.post("/saveTitle", Middleware, SaveTitle);
route.post("/sendFeedBack", Middleware, FeedBack);
route.get("/checkfeedback", Middleware, CheckFeedBack);
route.post("/ask-gemini", Middleware, AskGemini);
route.post("/saveedit", Middleware, SaveEdit);
route.post("/SaveRow", Middleware, SaveRow);


export default route;
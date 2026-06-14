// API/auth.routes.js
import express from "express";
import {
    SaveLinks, GetLinks,
    EditTable, DeleteLink,
    SaveLinkRow, SaveTitle,
    FeedBack, CheckFeedBack,
    AskGemini
} from "./link.controllers.js";
import { Middleware } from "./auth.middleware.js";

const route = express.Router();

route.post("/SaveLinks", Middleware, SaveLinks);
route.get("/GetLinks", Middleware, GetLinks);
route.post("/editable", Middleware, EditTable);
route.post("/deletelink", Middleware, DeleteLink);
route.post("/savelinkrow", Middleware, SaveLinkRow);
route.post("/saveTitle", Middleware, SaveTitle);
route.post("/sendFeedBack", Middleware, FeedBack);
route.get("/checkfeedback", Middleware, CheckFeedBack);
route.post("/ask-gemini", Middleware, AskGemini);


export default route;
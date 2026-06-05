// API/auth.routes.js
import express from "express";
import { SaveLinks, GetLinks } from "./link.controllers.js";
import { Middleware } from "./auth.middleware.js";

const route = express.Router();

route.post("/SaveLinks", Middleware, SaveLinks);
route.get("/GetLinks", Middleware, GetLinks);

export default route;
import express from "express";
import { SaveLinks, GetLinks, Redirect } from "./link.controllers.js";
import { Middleware } from "./auth.middleware.js";

const route = express.Router();

route.post("/SaveLinks", Middleware, SaveLinks);
route.get("/GetLinks", Middleware, GetLinks);
route.get("/:code", Redirect);

export default route;
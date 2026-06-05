const express = require("express");
const { SaveLinks, GetLinks, Redirect } = require("./link.controllers");
const { Middleware } = require("./auth.middleware");

const route = express.Router();

route.post("/SaveLinks", Middleware, SaveLinks);
route.get("/GetLinks", Middleware, GetLinks);
route.get("/:code", Redirect); //

module.exports = route;
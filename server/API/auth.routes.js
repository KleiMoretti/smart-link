// Palitan ng require ang import
const express = require("express");
const { SaveLinks } = require("./link.controllers");
const { GetLinks } = require("./link.controllers");
const { Middleware } = require("./auth.middleware")


const route = express.Router();

route.post("/SaveLinks", Middleware, SaveLinks);
route.get("/GetLinks", Middleware, GetLinks);


module.exports = route;
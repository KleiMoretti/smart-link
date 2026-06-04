// Palitan ng require ang import
const express = require("express");
const { SaveLink } = require("./link.controllers");
const { Middleware } = require("./auth.middleware")

const route = express.Router();

route.post("/SaveLinks", Middleware, SaveLink);

module.exports = route;
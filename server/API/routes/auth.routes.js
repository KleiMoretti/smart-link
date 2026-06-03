// Palitan ng require ang import
const express = require("express");
const { SaveLink } = require("../controllers/link.controllers.js");

const route = express.Router();

route.post("/SaveLinks", SaveLink);

module.exports = route;
const express = require("express");
const routers = express.Router();

routers.get("/", (req, res) => {
  res.render("index/welcome");
});

// dashboard

routers.get("/dashboard", (req, res) => {
  res.render("index/dashboard");
});

module.exports = routers;

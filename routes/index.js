const express = require("express");
const routers = express.Router();
const mongoose = require("mongoose");
const Story = mongoose.model("stories");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

routers.get("/", ensureGuest, (req, res) => {
  res.render("index/welcome");
});

// dashboard

routers.get("/dashboard", ensureAuthenticated, (req, res) => {

  Story.find({
    user: req.user.id
  }).then(stories => {
    res.render("index/dashboard", {
      stories: stories
    });
  });
});

// about route

routers.get("/about", (req, res) => {
  res.render("index/about");
});

module.exports = routers;

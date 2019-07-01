const express = require("express");
const routers = express.Router();

//  index router
routers.get("/", (req, res) => {
  res.render("stories/index");
});

// add stories
routers.get("/add", (req, res) => {
  res.render("stories/add");
});

// edit stories
routers.get("/edit", (req, res) => {
  res.render("stories/edit");
});

// show stories

routers.get("/show", (req, res) => {
  res.render("stories/show");
});
module.exports = routers;

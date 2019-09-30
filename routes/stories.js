const express = require("express");
const routers = express.Router();
const mongoose = require("mongoose");
const Story = mongoose.model("stories");
const User = mongoose.model("user");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

//  index router
routers.get("/", (req, res) => {
  Story.find({
    status: "public"
  })
    .populate("user")
    .then(stories => {
      res.render("stories/index", {
        stories: stories
      });
    });
});

// add stories
routers.get("/add", ensureAuthenticated, (req, res) => {
  res.render("stories/add");
});

// edit stories
routers.get("/edit", ensureAuthenticated, (req, res) => {
  res.render("stories/edit");
});

// show stories

routers.get("/show/:id", (req, res) => {
  Story.findById({
    _id: req.params.id
  })
    .populate("user")
    .then(story => {
      console.log(story);
      res.render("stories/show", {
        story: story
      });
    });
});

routers.post("/", (req, res) => {
  let allowComments;
  if (req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }

  const newStory = {
    title: req.body.title,
    status: req.body.status,
    allowComments: allowComments,
    body: req.body.body
  };

  new Story(newStory).save().then(story => {
    res.redirect(`/stories/show/${story.id}`);
  });
});
module.exports = routers; 

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent1 =
  "Welcome to my digital sanctuary! This is where I open the pages of my life, sharing the ordinary and extraordinary moments that shape my days. Through this journal, I invite you to explore with me, connecting through shared experiences, emotions, and reflections. ";
const homeStartingContent2 =
  " Why share? Because life gains meaning when stories are exchanged. Here, you'll find unfiltered thoughts, victories, and lessons. From the mundane to the profound, every snapshot is a part of the mosaic that is me. As you read, I hope you'll discover a piece of yourself in my words. Let's embark on this adventure together, where vulnerability becomes strength and where the beauty of existence unfolds.";

const aboutContent =
  " Hi, I'm Rachit, a software developer and full-stack web developer. I'm passionate about building things that make people's lives easier and more enjoyable. I love the challenge of solving complex problems with code, and I'm always looking for new ways to use technology to make a difference. I'm also a bit of a nerd. I love learning new things, and I'm always eager to try out new technologies. I'm also a big fan of open source software, and I believe that it's important to share my knowledge and skills with others. In my spare time, I enjoy reading, and playing video games. I'm also a big fan of science fiction and astronomy, and I'm always looking for new books and movies to explore. I'm always looking for new challenges, and I'm excited to see what the future holds for me in the world of software development. I believe that design is about more than just making things look pretty – it's about solving problems and creating intuitive, enjoyable experiences for users. Whether I'm working on a website, mobile app, or other digital product, I bring my commitment to design excellence and user-centered thinking to every project I work on.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Enter mongoose

let posts = [];

const postSchema = new mongoose.Schema({
  postTitle: String,
  postBody: String,
});

const Post = new mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}).then(function (posts) {
    res.render("home", {
      startingContent1: homeStartingContent1,
      startingContent2: homeStartingContent2,

      posts: posts,
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody,
  });

  post.save();

  res.redirect("/");
});

app.get("/posts/:postID", function (req, res) {
  const requestedID = req.params.postID;

  // console.log(requestedID);

  Post.findOne({ _id: requestedID }).then(function (post) {
    res.render("post", {
      title: post.postTitle,
      content: post.postBody,
    });
  });
});

app.listen(3001, function () {
  console.log("Server started on port 3001");
});

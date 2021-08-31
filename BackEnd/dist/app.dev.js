"use strict";

var express = require("express");

var mongoose = require("mongoose");

var _require = require("./models/blogs"),
    findById = _require.findById; // const morgan = require('morgan')


var Blog = require("./models/blogs");

var app = express();
var mongoDB = "mongodb+srv://ucheNode-js:ucheprogramming@node-backend.jsodg.mongodb.net/node-backEnd?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (result) {
  return app.listen(3001);
})["catch"](function (err) {
  return console.log(err);
});
var name = "uche";
app.set("view engine", "ejs");
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"]("public"));
app.get("/", function (req, res) {
  Blog.find().sort({
    createdAt: -1
  }).then(function (blogs) {
    res.render("home", {
      blogs: blogs
    });
  })["catch"](function (err) {
    return console.log(err);
  });
});
app.post("/", function (req, res) {
  var blog = new Blog(req.body);
  blog.save().then(function (result) {
    res.redirect("/");
  })["catch"](function (err) {
    console.log(err);
  });
});
app.get("/blogdetails/:id", function (req, res) {
  Blog.findById(req.params.id).then(function (blog) {
    res.render("blogdetail", {
      blog: blog,
      name: name
    });
  })["catch"](function (err) {
    return console.log(err);
  });
});
app["delete"]("/blogDetails/:id", function (req, res) {
  var id = req.params.id;
  Blog.findByIdAndDelete(id).then(function (result) {
    res.json({
      redirect: "/"
    });
  })["catch"](function (err) {
    return console.log(err);
  });
});
app.get("/projects", function (req, res) {
  res.redirect("/ ");
});
app.get("/home", function (req, res) {
  res.redirect("/ ");
});
app.get("/addBlog", function (req, res) {
  res.render("addBlog");
});
app.use(function (req, res) {
  res.status(404).render("404");
}); // app.use(morgan('dev'));
// app.get('/addblogs',(req,res)=>{
// const blog = new Blog(
// {
// title:"setting up node js",
// snippet:"node-js as backend",
// body:"node-js is a frame work for javascript"
// })
// blog.save()
// .then((result)=>{
// res.send(result)
// })
// .catch((err)=>console.log(err))
// })
// app.get('/allblogs',(req,res)=>{
// Blog.find()
// .then((result)=>{
// res.send(result)
// })
// .catch((err)=>console.log(err))
// })
// app.get('/findblogs',(req,res)=>{
// Blog.findById("611bf4ba3af3c76e84c7fceb")
// .then((result)=>{
// res.send(result)
// })
// .catch((err)=>console.log(err))
// })
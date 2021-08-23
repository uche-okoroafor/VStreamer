const express = require("express");
const mongoose = require("mongoose");
const { findById } = require("./models/userAccess");
// const morgan = require('morgan')
const UserAccess = require("./models/userAccess");

const app = express();

const mongoDB = "mongodb+srv://ucheNode-js:ucheprogramming@node-backend.jsodg.mongodb.net/VStreamer?retryWrites=true&w=majority";

;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // UserAccess.find()
  //   .sort({ createdAt: -1 })
  //   .then((blogs) => {
  //     res.render("home", { blogs });
  //   })
res.send("working")
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  UserAccess.find()
    .sort({ createdAt: -1 })
    .then((blogs) => {
      res.render("home", { blogs });
    })
    .catch((err) => console.log(err));
});

app.post("/", (req, res) => {
  const blog = new UserAccess(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});



app.get("/blogdetails/:id", (req, res) => {
  UserAccess.findById(req.params.id)
    .then((blog) => {
      res.render("blogdetail", { blog,name });
    })
    .catch((err) => console.log(err));
});

app.delete("/blogDetails/:id", (req, res) => {
  const id = req.params.id;
  UserAccess.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => console.log(err));
});

app.get("/projects", (req, res) => {
  res.redirect("/ ");
});

app.get("/home", (req, res) => {
  res.redirect("/ ");
});

app.get("/addBlog", (req, res) => {
  res.render("addBlog");
});

app.use((req, res) => {
  res.status(404).render("404");
});

// app.use(morgan('dev'));

// app.get('/addblogs',(req,res)=>{
// const blog = new UserAccess(
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
// app.listen(5000)

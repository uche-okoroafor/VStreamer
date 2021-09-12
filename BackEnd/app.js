const express = require("express");
const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");
// const morgan = require('morgan')
const loginRoute = require("./routes/loginRoute.js");
const createAccountRoute = require("./routes/createAccountRoute.js");
const uploadVideoRoute = require("./routes/uploadVideoRoute.js");
const downloadVideosRoute = require("./routes/downloadVideosRoute.js");
const fs = require("fs");
const usersRoute = require("./routes/usersRoute.js");
require("dotenv/config");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(5000,() => console.log("server is running"))
    console.log("connected to data Base");
  })
  .catch((err) => console.log(err));

app.use("/login", loginRoute);
app.use("/create_account", createAccountRoute);
app.use("/users/", usersRoute);
app.use("/upload_video", uploadVideoRoute);
app.use("/download_videos", downloadVideosRoute);








app.post("/upload/:videoId", (req, res) => {
  console.log(req.params.videoId);  
  if (req.files === null) {
    return res.status(400).json({ meg: "no file upload" });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err, 500);
      return res.status(500).send(err);
    }
fs.rename(`/uploads/${file.name}`,`/uploads/${req.params.videoId}`,(err)=>{ 
console.log(err,101)
 
})
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

// app.patch("/uses/uche/22266",(req,res)=>{

// res.send(req.body)
// })

app.post("/post/", (req, res) => {
  console.log;
  res.send(req.body);
});

// app.post("/", (req, res) => {
//   const state = new Blog(req.body);
//   state.save()
//     .then((result) => {
//       res.redirect("/");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/users",(req,res)=>{
// console.log(req.url,200)
// res.json({
// user:["user1","user220000"]

// })

// })
// app.listen(5000, () => console.log("server is running"));

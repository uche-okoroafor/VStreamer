const UserAccess = require("../models/userAccess");
const Users = require("../models/users");
const fs = require("fs");
 


const uploadVideoDetailsController = async (req, res) => {
  try {
    const uploadVideo = await Users.updateOne(
      { _id: req.params.userIdName },
      {
        $push: {
          videos: [req.body],
        },
      }
    );
    res.json(uploadVideo);
  } catch (err) {
    res.send(err);
  }
};



const uploadVideoController = async (req, res) => {
  console.log(req.params.videoId);
  if (req.files === null) {
    return res.status(400).json({ meg: "no file upload" });
  }
  const file = req.files.file;
  file.mv(`./uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err, 500);
      return res.status(500).send(err);
    }
    fs.rename(
      `./uploads/${file.name}`,
      `./uploads/${req.params.videoId}.mp4`,   
      (err) => {
        if (err) {
      console.log(err, 500);
      return res.status(500).send(err);
    }
      }  
    );
    res.json({ fileName: file.name, filePath:`/uploads/${file.name}` }); 
  });
};

// app.post("/postupdate/",async (req, res) => {
//      try{

// const uploadVideo = await  Users.updateOne({_id:"61307544055f04b7c00b2203"},{
//  $push:{videos:[
// {
//     videoSource: "https://youtu.be/1WHPExTeOwg",
//         videoTitle: "james",
//         videoId: "gfhhfgjgjgjg",
//       },
// ]}}
// )

// res.send(dateVideo)
// // const updateVideo = await Users.collection("videos").insertOne(req.body, function(err, res) {
// //     if (err) throw err;
// //     console.log("1 document inserted");
// //    Users.close();
// //   });

// // const updateVideo = await Users.updateOne(
// // {_id:req.params.userId },{
// // $set:{videos:req.body}
// // }

// // );
// // res.json(updateVideo);
//      }catch(err){

// res.send(err)
// }

// });
module.exports = {
  uploadVideoDetailsController,
  uploadVideoController,
};

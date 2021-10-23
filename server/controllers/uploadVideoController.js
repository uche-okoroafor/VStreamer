const User = require('../models/User')
const fs = require('fs')

exports.uploadVideoDetailsController = async (req, res) => {
  const { userId, videoTitle, videoSource, videoId } = req.body
  if ((!userId, !videoTitle, !videoSource, !videoId)) {
    return res
      .status(400)
      .json({ err: 'userId,videoSource,videoTitle or videoId is undefined' })
  }

  try {
    const videoUpdateStatus = await User.updateOne(
      { _id: userId },
      { $push: { 'userData.videos': [{ videoTitle, videoSource, videoId }] } }
    )

    res.status(200).json(videoUpdateStatus)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.uploadVideoController = async (req, res) => {
  console.log(req.files)

  if (!req.params.videoId) {
    return res.status(400).json({ meg: 'videoId not defined' })
  }
  if (req.files === null || !req.files) {
    return res.status(400).json({ meg: 'no file upload' })
  }
  const { file } = req.files
  file.mv(`./uploads/${file.name}`, err => {
    if (err) {
      console.log(err, 5000)
      return res.status(500).send(err)
    }
    fs.rename(
      `./uploads/${file.name}`,
      `./uploads/${req.params.videoId}.mp4`,
      err => {
        if (err) {
          console.log(err, 500)
          return res.status(500).send(err)
        }
      }
    )
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
  })
}

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

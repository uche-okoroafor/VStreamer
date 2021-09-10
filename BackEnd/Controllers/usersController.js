const UserAccess = require("../models/userAccess");
const Users = require("../models/users");
const bcrypt = require("bcrypt");

exports.uploadVideoController = async (req, res) => {
console.log(req.body)
  try {
    const uploadVideo = await Users.updateOne(
      { _id:req.params.userId},
      {
        $push: {
          videos: [
           req.body
          ],
        },
      }
    );

    res.send(uploadVideo);
  } catch (err) {
    res.send(err);
  }
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

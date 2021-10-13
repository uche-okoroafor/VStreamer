const Users = require("../models/users");
const fs = require("fs")

exports.streamVideosController = async(req, res) => {
const range = req.headers.range; 
if(!range){
res.status(400).send("Requires Range header");
  
}
const videoPath = `./uploads/${req.params.videoSource}.mp4`; 
const videoSize = fs.statSync(videoPath).size;
const CHUNK_SIZE =10**6;
 const start = Number(range.replace(/\D/g, "")); 
const end = Math.min(start+CHUNK_SIZE,videoSize-1);
const contentLength = end - start+1;
 
 const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(videoPath, { start, end });

  videoStream.pipe(res);
  
  
  
  
  
  
  
  
  const User = require('../models/User')
const UserProfile = require('../models/UserProfile')
const asyncHandler = require('express-async-handler')

exports.profile = asyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      birthDate,
      phoneNumber,
      address,
      city,
      country,
      description,
      available,
      availabityPeriod
    } = req.body

    const profile = new UserProfile({
      firstName,
      lastName,
      gender,
      birthDate,
      phoneNumber,
      address,
      city,
      country,
      description,
      available,
      availabityPeriod
    })

    if (req.params.userId) {
      const userProfile = await User.updateOne(
        { _id: req.params.userId },
        {
          $set: {
            profile
          }
        }
      )
      return res.status(201).json(userProfile)
    } else {
      return res.status(400).json({ err: 'user id undefined' })
    }
  } catch (err) {
    return res.status(400).send(err)
  }
})

exports.getProfile = asyncHandler(async (req, res) => {
  try {
    const userProfile = await User.findById({ _id: req.params.userId }).select(
      'profile'
    )
    return res.status(200).json(userProfile)
  } catch (err) {
    return res.status(404).send(err)
  }
})

exports.getAllProfiles = asyncHandler(async (req, res) => {
  try {
    const allProfiles = await User.find().select('profile')
    return res.status(200).json(allProfiles)
  } catch (err) {
    return res.status(404).send(err)
  }
})




};

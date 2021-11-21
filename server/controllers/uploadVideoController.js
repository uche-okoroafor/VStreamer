const User = require('../models/User')
const fs = require('fs')
const cloud = require('../config/cloudinaryConfig')

exports.uploadVideoDetailsController = async (req, res) => {
  const {
    username,
    userId,
    videoTitle,
    videoSource,
    videoId,
    videoDescription,
    videoTags,
    videoCategory
  } = req.body
  if ((!userId, !videoTitle, !videoSource, !videoId)) {
    return res
      .status(400)
      .send({ err: 'userId,videoSource,videoTitle or videoId is undefined' })
  }

  try {
    const videoUpdateStatus = await User.updateOne(
      { _id: userId },
      {
        $push: {
          videos: [
            {
              username,
              userId,
              videoTitle,
              videoSource,
              videoId,
              videoDescription,
              videoTags,
              videoCategory,
              likes: [],
              dislikes: [],
              views: [],
              comments: []
            }
          ]
        }
      }
    )

    res.status(200).json(videoUpdateStatus)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.uploadVideoController = async (req, res) => {
  const {
    username,
    userId,
    videoTitle,
    videoSource,
    videoId,
    videoDescription,
    videoTags,
    videoCategory,
    likes: [],
   dislikes: [],
    views: [],
    comments: []
  } = req.body

  // const userId = req.user.id
  try {
    const uploadStatus = await cloud.uploads(req)
    // if (uploadStatus) {
    //   const videoUpdateStatus = await User.updateOne(
    //     { _id: userId },
    //     {
    //       $push: {
    //         videos: [
    //           {
    //             username,
    //             userId,
    //             videoTitle,
    //             videoSource:uploadStatus.url,
    //             videoId:uploadStatus.asset_id,
    //             videoDescription,
    //             videoTags,
    //             videoCategory
    //           }
    //         ]
    //       }
    //     }
    //   )
    // }

    return res.status(200).send(uploadStatus)
  } catch (err) {
    return res.status(500).send('something went wrong')
  }
}

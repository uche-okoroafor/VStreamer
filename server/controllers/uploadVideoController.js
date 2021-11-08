const User = require('../models/User')
const fs = require('fs')
const cloud = require('../config/cloudinaryConfig')

exports.uploadVideoDetailsController = async (req, res) => {
  const {
    username,
    userId,
    title,
    source,
    videoId,
    videoDescription,
    videoTags,
    category
  } = req.body
  if ((!userId, !title, !source, !videoId)) {
    return res
      .status(400)
      .send({ err: 'userId,source,title or videoId is undefined' })
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
              title,
              source,
              videoId,
              videoDescription,
              videoTags,
              category
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
    title,
    source,
    videoId,
    videoDescription,
    videoTags,
    category
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
    //             title,
    //             source:uploadStatus.url,
    //             videoId:uploadStatus.asset_id,
    //             videoDescription,
    //             videoTags,
    //             category
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

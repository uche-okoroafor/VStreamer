const User = require('../models/User.js')

exports.getAllVideosController = async (req, res) => {
  try {
    const response = await User.find({}, { videos: 1, _id: 0 })
    let allVideos = []
    response.forEach(videoArray => {
      allVideos = [...allVideos, ...videoArray.videos]
    })

    res.status(200).json(allVideos)
  } catch (err) {
    res.status(404).json(err)
  }
}

exports.getUserVideosController = async (req, res) => {
  const { userId } = req.body
  if (!userId) {
    return res.status(404).json({ err: 'userId is undefined' })
  }
  try {
    const userVideos = await User.find({ _id: userId }, { videos: 1, _id: 0 })
    res.status(200).json(userVideos)
  } catch (err) {
 res.status(404).json({err:err.message})
  }
}

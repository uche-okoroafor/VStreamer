const User = require('../models/User.js')

exports.getAllVideosController = async (req, res) => {
  console.log('hers')
  try {
    const foundAllvideos = await User.find({}, { videos: 1, _id: 0 })
    let allVideos = []
    foundAllvideos.forEach(videoArray => {
      allVideos = [...allVideos, ...videoArray.videos]
    })

    res.status(200).json(allVideos)
  } catch (err) {
    res.send(err)
  }
}

exports.getUserVideosController = async (req, res) => {
  try {
    const usersData = await Users.find()

    let userVideos = []
    usersData.forEach(user => {
      userVideos = [...userVideos, ...user.videos]
    })
    res.send(userVideos)
  } catch (err) {
    res.send(err)
  }
}

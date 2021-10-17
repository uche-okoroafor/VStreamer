const User = require('../models/User.js')

exports.getAllVideosController = async (req, res) => {
  console.log('hers')
  try {
    const allUsers = await User.find()
    let allVideos = [];
    allUsers.forEach((user) => {
      allVideos = [...allVideos, ...user.userData.videos];
    });
    res.send({ data: allVideos })
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

const Users = require("../models/users");

exports.videosSourceController = async (req, res) => {
  try {
    const usersData = await Users.find();

    let userVideos = [];
    usersData.forEach((user) => {
      userVideos = [...userVideos, ...user.videos];
    });
    res.send(userVideos);
  } catch (err) { 
    res.send(err);
  }
};

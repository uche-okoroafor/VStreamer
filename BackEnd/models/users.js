const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqString = {
  type: "string",
  required: true,
};
const noReqString = {
  type: "string",
  required: false,
};

const usersSchema = new Schema(
  {
    userName: reqString,
    videos: [
      {
        videoSource:noReqString,
        videoTitle:noReqString,
        views:noReqString,
        videoId:noReqString,
        videoDuration: noReqString,
        comments: noReqString,
        likes:noReqString,
      },
    ],
    userPhoto: noReqString,
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;

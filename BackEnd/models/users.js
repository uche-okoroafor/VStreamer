const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    userName: {
      type: "string",
      required: true,
    },
    videos: {
      videoUrl: {
        type: "string",
        required: true,
      },
    },

    userPhoto: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;

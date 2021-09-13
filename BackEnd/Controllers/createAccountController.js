const UserAccess = require("../models/userAccess");
const Users = require("../models/users");
const bcrypt = require("bcrypt");

exports.createAccountController = async (req, res) => {
  let userExist = false;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
    const usersList = new Users({
      userName: req.params.userName,
      videos: [],

      userPhoto: "",
    });

    UserAccess.find()
      .then((userAccess) => {
        for (let user of userAccess) {
          if (req.params.userName === user.userName) {
            userExist = true;
            return res.json({ status: false });
          }
        }
        if (!userExist) {
          usersList.save()
            .then((result) => {
   const userAccessList = new UserAccess({
      userName: req.params.userName,
      password: hashedPassword,
         userId:result._id
    });
 userAccessList.save();
            return res.json({ status: true });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  } catch {
    (err) => {
      res.status(500).send();

      console.log(err);
    };
  }
};

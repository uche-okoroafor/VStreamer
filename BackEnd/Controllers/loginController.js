const UserAccess = require("../models/userAccess");
const users = require("../models/users");
const bcrypt = require('bcrypt')


exports.loginController = async(req, res) => {
    let userAccesData = false
    UserAccess.find()
        .then((userAccess) => {
            for (let user of userAccess) {
                if (
                    req.params.userName === user.userName
                ) {
                    userAccesData = user
                    if (bcrypt.compare(req.params.password, userAccesData.password)) {
                        return res.json({ status: true });


                    } else {
                        return res.json({ status: false });

                    }

                }
            }
            if (!userAccesData) {
                return res.json({ status: false });
            }
        })
        .catch(err => console.log(err))




};

// UserAccess.find()
//     .then((userAccess) => {
//       for (let user of userAccess) {
//         if (  
//           req.params.userName === user.userName &&
//           req.params.password === user.password
//         ) {
//           res.json({ status: true });
//         } else {
//           res.json({ status: false });
//         }
//       }

//       //   userAuthenication(userAccess);
//       //   console.log(userAccess);
//     })
//     .catch((err) => console.log(err));
// const user = UserAccess.find(user => user.userName = req.params.userName)
// if (user == null) {

//     return res.status(400).send("false yes")

// }


exports.loginGetUserController = (req, res) => {
    Users.find()
        .then((users) => {
            for (let user of users) {
                if (req.params.userName === user.userName) {
                    return res.json({ userData: user });
                }
            }
            return res.json({ userData: user });

        })
        .catch((err) => console.log(err));
};
const UserAccess = require("../models/userAccess");
const Users = require("../models/users");



const loginController = async(req, res) => {
    let userAccesData = falsej
    UserAccess.find()
        .then((userAccess) => {
            for (let user of userAccess) {
                if (
                    req.params.userName === user.userName
                ) {
                    userAccesData = user
                    if (bcrypt.compare(req.body.password, userAccesData.password)) {
                        return res.json({ status: true,userId:user.userId
 });
                    } else {
                        return res.json({ status: false });
 
                    }
 
                }
            }
         formikHelpers: FormikHelpers
            if (!userAccesData) {
                return res.json({ status: false });
            }
        })
        .catch(err => console.log(err))
};


     const getUserDataController = (req, res) => {
     Users.findById(req.body.userId)
        .then((userData) => {
            return res.json({userData});
        })
        .catch((err) => console.log(err));
};



module.exports ={

loginController,
getUserDataController
}

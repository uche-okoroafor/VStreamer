const UserAccess = require('../models/userAccess')
const Users = require('../models/users')
const bcrypt = require('bcrypt')

exports.createAccountController = async (req, res) => {
  let userExist = false
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.params.password, salt)
    const userAccessList = new UserAccess({
      userName: req.params.userName,
      password: hashedPassword
    })
    const usersList = new Users({
      userName: req.params.userName,
      videos: {
        videoUrl: 'viewing you'
      },

      userPhoto: 'my pic'
    })
    UserAccess.find()
      .then(userAccess => {
        for (let user of userAccess) {
          if (req.params.userName === user.userName) {
            userExist = true
console.log(true)
            return res.json({ status: false })
          }
        }
        if (!userExist) {
console.log(false)

          usersList.save()
          userAccessList
            .save()
            .then(result => {
              return res.send(result)
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  } catch {
    err => {
      res.status(500).send()

      console.log(err)
    }
  }
}

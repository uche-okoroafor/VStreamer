const User = require('../models/User')
const UserProfile = require('../models/UserProfile')
const asyncHandler = require('express-async-handler')

exports.profile = asyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      birthDate,
      phoneNumber,
      address,
      city,
      country,
      description,
      available,
      availabityPeriod
    } = req.body

    const profile = new UserProfile({
      firstName,
      lastName,
      gender,
      birthDate,
      phoneNumber,
      address,
      city,
      country,
      description,
      available,
      availabityPeriod
    })

    if (req.params.userId) {
      const userProfile = await User.updateOne(
        { _id: req.params.userId },
        {
          $set: {
            profile
          }
        }
      )
      return res.status(201).json(userProfile)
    } else {
      return res.status(400).json({ err: 'user id undefined' })
    }
  } catch (err) {
    return res.status(400).send(err)
  }
})

exports.getProfile = asyncHandler(async (req, res) => {
  try {
    const userProfile = await User.findById({ _id: req.params.userId }).select(
      'profile'
    )
    return res.status(200).json(userProfile)
  } catch (err) {
    return res.status(404).send(err)
  }
})

exports.getAllProfiles = asyncHandler(async (req, res) => {
  try {
    const allProfiles = await User.find().select('profile')
    return res.status(200).json(allProfiles)
  } catch (err) {
    return res.status(404).send(err)
  }
})

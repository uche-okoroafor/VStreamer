const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFileStream } = require('../middleware/s3')
const User = require('../models/User')

exports.uploadImageController = async (req, res) => {
  const userId = req.user.id
  const file = req.file
  //   const result = await uploadFile(file)
  //   await unlinkFile(file.path)
  // user
  //   const description = req.body.description
  //   res.send({ imagePath: `/images/${result.Key}` })

  try {
    const cloudResponse = await uploadFile(file)
    await unlinkFile(file.path)

    const description = req.body.description
    const image = await User.updateOne(
      { _id: userId },
      {
        $set: {
          userImage: {
            imageName: req.file.originalname,
            imageSource: `/image/download-image/${cloudResponse.Key}`,
            imageId: cloudResponse.Key
          }
        }
      }
    )
    res.send({ image, description })
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.downloadImageController = async (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)
  readStream.pipe(res)
}

exports.deleteImageController = async (req, res) => {
  console.log(req.files)

  if (!req.params.videoId) {
    return res.status(400).json({ meg: 'videoId not defined' })
  }
  if (req.files === null || !req.files) {
    return res.status(400).json({ meg: 'no file upload' })
  }
  const { file } = req.files
  file.mv(`./uploads/${file.name}`, err => {
    if (err) {
      console.log(err, 5000)
      return res.status(500).send(err)
    }
    fs.rename(
      `./uploads/${file.name}`,
      `./uploads/${req.params.videoId}.mp4`,
      err => {
        if (err) {
          console.log(err, 500)
          return res.status(500).send(err)
        }
      }
    )
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
  })
}

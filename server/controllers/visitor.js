const asyncHandler = require('express-async-handler')
const Visitor = require('../models/VisitorIp')
const Visit = require('../models/Visits')

// @route POST /like
// @access Private
exports.addVisitorController = asyncHandler(async (req, res, next) => {
  const { ipAddress, link, screenSize } = req.params
  console.log(screenSize, req.body, 'screenSize')
  const checkVisitor = await Visitor.findOne({ ipAddress })

  if (checkVisitor) {
    const visits = new Visit({
      link,
      screenSize
    })
    await Visitor.updateOne(
      { ipAddress },
      {
        $push: {
          visitedLinks: visits
        }
      }
    )
    return res.status(200).json({ success: true })
  } else {
    const visits = new Visit({
      link,
      ipAddress,
      screenSize
    })
    await Visitor.create({ ipAddress, visitedLinks: [visits] })
  }

  res.status(200).json({ success: true })
})

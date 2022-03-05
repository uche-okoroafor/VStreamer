const asyncHandler = require('express-async-handler')
const Visitor = require('../models/VisitorIp')

// @route POST /like
// @access Private
exports.addVisitorController = asyncHandler(async (req, res, next) => {
  const  ipAddress  = req.params
if(ipAddress.ipAddress === "5.107.59.224"){
return
}

await Visitor.create(ipAddress)
res.status(200).json({success:"true"})
})

const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// @route POST /request/
// @desc create a new request by owner
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { sitterId, startDate, endDate } = req.body;
    const requestModel = {
        ownerId: ObjectId(userId), 
        sitterId,
        startDate,
        endDate,
    };

    const existingRequest = await Request.findOne(requestModel);
    if (existingRequest) {
      return res
          .status(200) 
          .json({ message: 'You have already made a request', existingRequest });
    }

    const newRequest = await Request.create(requestModel); 
    res.status(201).json({ newRequest });
  } catch (error) {
    next(error);
  } 
});

// @route GET /request
// @desc list of requests made for logged in user
// @access Private
exports.userRequests = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const requestsByUser = await Request.find({ 
      $or: [
        { ownerId: ObjectId(userId) },
        { sitterId: ObjectId(userId) }
      ] 
    });

      res.status(200).json({ requestsByUser });
  } catch (error) {
      next(error);
  } 
});

// @route UPDATE /request/accepted
// @desc Update request with approved or decline by sitter
// @access Private
exports.updateStatus = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { requestId, status } = req.body;

    const request = await Request.findById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ message: "Request does not exists"});
    }
    if (request.sitterId !== ObjectId(userId)) {
      return res
        .status(401)
        .json({ message: 'Not authorized' });
    }

    request.status = status;
    await request.save();

    res.status(200).json({ request });
  } catch (error) {
    next(error);
  }
});


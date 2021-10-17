const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { 
    createRequest,
    userRequests,
    updateStatus
} = require("../controllers/request");

router.route("/create").post(protect, createRequest);
router.route("/list").get(protect, userRequests);
router.route("/status").patch(protect, updateStatus);

module.exports = router;

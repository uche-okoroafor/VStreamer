const express = require('express')
const router = express.Router()
const cors = require('cors')
const { addVisitorController } = require('../controllers/visitor')

router
  .route('/add/:ipAddress/:link/:screenSize')
  .post(cors(), addVisitorController)

module.exports = router

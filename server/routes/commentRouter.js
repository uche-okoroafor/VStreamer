const express = require('express')
const protect = require('../middleware/auth')
const router = express.Router()
const {
  addCommentController,
  editCommentController,
  deleteCommentController
} = require('../controllers/commentController')

router.route('/add-comment').post(protect, addCommentController)
router.route('/edit-comment').post(protect, editCommentController)
router.route('/delete-comment').post(protect, deleteCommentController)

module.exports = router

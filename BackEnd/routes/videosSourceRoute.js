const express =require("express");
router = express.Router();
videosSourceRoute =require("../controllers/videosSourceController")

router.post("/",videosSourceRoute.videosSourceController)  

module.exports=router   
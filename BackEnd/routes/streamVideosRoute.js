const express =require("express");
router = express.Router();
streamVideosRoute =require("../controllers/streamVideosController")



router.get("/:videoSource",streamVideosRoute.streamVideosController)  

module.exports={
router

}  
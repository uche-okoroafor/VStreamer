const express =require("express");
router = express.Router();
uploadVideoRoute =require("../controllers/uploadVideoController")


router.post("/video_details/:userName/:userId",uploadVideoRoute.uploadVideoDetailsController)  
router.post("/:videoId",uploadVideoRoute.uploadVideoController)  

module.exports=router  
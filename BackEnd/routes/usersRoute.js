const express =require("express");
router = express.Router();
userRoute= require("../Controllers/usersController")

router.get("/",userRoute.usersController)
 



module.exports=router;
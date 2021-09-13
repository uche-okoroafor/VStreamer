const express =require("express");
router = express.Router();
userRoute= require("../controllers/usersController")

router.get("/",userRoute.usersController)
 



module.exports=router;
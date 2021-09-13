const express =require("express");
router = express.Router();
loginRoute =require("../controllers/loginController")



router.post("/:userName",loginRoute.loginController)
router.post("/:userName/user_data",loginRoute.getUserDataController )



module.exports=router
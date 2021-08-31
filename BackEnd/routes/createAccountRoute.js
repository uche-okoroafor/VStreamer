const express =require("express");
router = express.Router();
createAccountRoute =require("../Controllers/createAccountController")

router.post("/:userName/:password",createAccountRoute.createAccountController)




module.exports=router
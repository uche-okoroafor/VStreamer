const express =require("express");
router = express.Router();
createAccountRoute =require("../controllers/createAccountController")

router.post("/:userName",createAccountRoute.createAccountController)




module.exports=router
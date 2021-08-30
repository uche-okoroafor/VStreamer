const express =require("express");
router = express.Router();
loginRoute =require("../Controllers/loginController")



router.get("/:userName/:password",loginRoute.loginController)
router.get("/:userName",loginRoute.loginGetUserController )
// router.get("/",(req,res)=>{

// console.log(req.params,200)
// console.log(req.body,500)
// })


module.exports=router
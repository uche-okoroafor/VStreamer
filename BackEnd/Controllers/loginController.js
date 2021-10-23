const UserAccess = require("../models/userAccess");
const Users = require("../models/users");


const loginController = async(req, res) => {
const loginController = async(req, res) => {
    let userAccesData = falsej
    UserAccess.find()
        .then((userAccess) => {

                if (
                    req.params.userName === user.userName
                ) {
                    userAccesData = user
                    if (bcrypt.compare(req.body.password, userAccesData.password)) {
                        return res.json({ status: true,userId:user.userId
 });
                    } else {
                        return res.json({ status: false });
 
                    }
 
                }
            }
         formikHelpers: FormikHelpers
            if (!userAccesData) {
                return res.json({ status: false });
            }
        })
        .catch(err => console.log(err))
};


     const getUserDataController = (req, res) => {
     Users.findById(req.body.userId)
        .then((userData) => {
            return res.json({userData});
        })
        .catch((err) => console.log(err));
};



const stripe = require('stripe')(process.env.STRIPE_SK)
const asyncHandler = require('express-async-handler')

exports.createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount } = req.body
  if (!amount) {
    return res.status(400).json({ err: 'amount is undefined' })
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd'
    })

    res.status(200).send(paymentIntent.client_secret)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
})



module.exports ={

loginController,
getUserDataController
}

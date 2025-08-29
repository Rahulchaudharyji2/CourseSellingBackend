const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../models/schema");
const userRoute = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authUserMiddleware = require("../middleware/userAuthMiddleware");
const userJwtSecret= process.env.userJwtSecret;
userRoute.post("/userLogin", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const bcrptPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      email,
      password: bcrptPassword,
      firstName,
      lastName,
    });
    res.status(200).json({
      message: "user created Succefully",
    });
  } catch (error) {
    res.status(404).json({
    message: error,
  })
}
  

});
userRoute.post("/userSignup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await userModel.findOne({email});
    const passwordMatch = await bcrypt.compare(password, response.password);
    if (response && passwordMatch) {
      const token = jwt.sign({
        id: response._id.toString(),
      },userJwtSecret);
      res.status(200).json({
        token: token,
        message: "signin Successfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
});

userRoute.post("/userPurchase",authUserMiddleware, async (req, res) => {
    const userId=req.userId
    const {courseId}=req.body;
    try {
        await purchaseModel.create({
            userId,
            courseId
        })
        res.status(200).json({
            message:"Course Bought Successfully"
        })
        
    } catch (error) {
        res.status(404).json({
            message:error
        })
    }

});

userRoute.get("/userSeePurchaseCourse",authUserMiddleware,async (req, res) => {
    const userId= req.userId;
    const purchase=await purchaseModel.find({
        userId
    })
    let purchaseCourse=[];
    for(let i=0;i<purchase.length;i++){
        purchaseCourse.push(purchase[i].courseId)
    }
     const coursesData = await courseModel.find({
        _id: { $in: purchaseCourse }
    })
     res.json({
        purchaseCourse,
        coursesData
    })
});
userRoute.get("/userAllCourses", async(req, res) => {
    try {
      const Courses=  await courseModel.find({})
      res.json({
        Courses
      })
        
    } catch (error) {
        res.status(404).json({
            message:error
        })
    }
});

module.exports = userRoute;

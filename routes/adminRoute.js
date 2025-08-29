const { Router } = require("express");
const adminRoute = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../models/schema");
const authMiddleware = require("../middleware/authMiddleware");
const jwtSecret = process.env.jwtSecret;

adminRoute.post("/adminLogin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const bcrptPassword = await bcrypt.hash(password, 5);
  await adminModel.create({
    email,
    password: bcrptPassword,
    firstName,
    lastName,
  });

  res.send("admin Login Successfully");
});
adminRoute.post("/adminSignUp", async (req, res) => {
  const { email, password } = req.body;
  const response = await adminModel.findOne({ email });
  const match = await bcrypt.compare(password, response.password);
  if (response && match) {
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      jwtSecret
    );
    res.status(200).json({
      token: token,
      message: " user login Successfully",
    });
  } else {
    res.status(404).json({
      message: "either email or password will be wrong",
    });
  }
});
adminRoute.post("/adminCreateCourse", authMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, price, imageUrl } = req.body;
  try {
    await courseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId: adminId,
    });
    res.send("course created SuccessFully");
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
});
adminRoute.put("/adminUpdateCourse", authMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, price, imageUrl, courseId } = req.body;
  try {
    const course = await courseModel.findOneAndUpdate(
      { _id: courseId, creatorId: adminId },
      { title, description, price, imageUrl },
      { new: true }
    );
    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found or not authorized" });
    } else {
      res.json({
        message: "Course updated",
        courseId: course._id,
      });
    }
  } catch (error) {
    res.status(404).json({
        message:error
    })
  }


  
});

module.exports = adminRoute;

const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  //   Validation of data

  try {
    validateSignUpData(req);

    const { password } = req.body;
    // Encrypt the password
    const passwordHash = bcrypt.hash(password, 10);
    console.log(passwordHash);

    // console.log(req.body);

    // creating a new instance of the User model or
    // Creating new user same thing
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //  Create a JWT Token
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token);
      res.send("Login successfully");
    } else {
      throw new Error("Invalid credentials+---------------------");
    }
  } catch (error) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send();
});

module.exports = authRouter;

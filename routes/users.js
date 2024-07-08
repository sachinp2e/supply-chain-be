const express = require("express");
const router = express.Router();
const User = require("../models/user");
var jwt = require("jsonwebtoken");
const { access } = require("fs");

// @route    GET api/users
// @desc     Get all users
// @access   Public
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name, password });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({...user}, "secret", { expiresIn: 60 * 60 });
    console.log("🚀 ~ router.post ~ token:", token)
    res.json({user:user,access_token:token});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/get-all-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/users/add
// @desc     Add a new user
// @access   Public
router.post("/add-participant", async (req, res) => {
  const { name, email, password, role, sku } = req.body;

  try {
    let user = await User.findOne({ name });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role,
      sku,
    });

    await user.save();

    res.json({ msg: "User registered" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

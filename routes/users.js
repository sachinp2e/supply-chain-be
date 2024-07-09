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
    res.json({user:user,access_token:token});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/get-all-users", async (req, res) => {
  try {
    const users = await User.find();
    const temp = users.filter((user)=> user.role !== "admin")
    res.json(temp);
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

// @route    POST api/users/:id/history
// @desc     Add history to a user
// @access   Public
router.post('/:sku/history', async (req, res) => {
    const { status } = req.body;
  
    try {
      let user = await User.findOne({sku:req.params.sku});
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      const newHistory = {
        status,
      };
  
      user.history.push(newHistory);
  
      await user.save();
  
      res.json(user.history);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


router.get('/:sku/user-history', async (req, res) => {
    try {
      let user = await User.findOne({sku:req.params.sku});
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      user.history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.json(user.history);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;

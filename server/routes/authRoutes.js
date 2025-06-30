const express = require("express")
const User = require("../models/User")
const passport = require('passport')
const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(200).json({msg: "user registered successfully", user: user})
    }catch(err){
        res.json({msg: "user not able to register"})
    }
})

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({ message: 'Logged in successfully', user: req.user });
});

module.exports = router;
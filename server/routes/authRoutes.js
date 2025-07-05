const express = require("express")
const User = require("../models/User")
const passport = require('passport')
const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(200).json({msg: "user registered successfully", user: user})
    }catch(err){
        res.json({msg: "user not able to register"})
    }
})

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("hello there")
    res.status(200).json({ message: 'Logged in successfully', user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.status(200).json({ message: 'Logged out' });
    });
});

router.get("/me", isLoggedIn ,(req, res) => {
    console.log("this is the me route", req.user)
    res.json({ user: req.user })
})

// middleware to check if the user is logged in or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) next();
    res.redirect('/');
}

module.exports = router;
const express = require("express");
const Room = require("../models/Room");
const isLoggedIn = require("../middleware/loggedIn");
const User = require("../models/User");
const router = express.Router()

router.get("/getRooms/:userId" ,async (req, res) => {
    const userId = req.params.userId;
    
    console.log(userId)
    const userData = await User.findById(userId).populate({
        path: "joinedRooms",
        populate: { path: "hostUser" }
    });
    res.json({ rooms: userData.joinedRooms })
})

router.get("/getInfo/:roomId" ,async (req, res) => {
    const roomId = req.params.roomId;
    
    // console.log(userId)
    // const userData = await User.findById(userId).populate({
    //     path: "joinedRooms",
    //     populate: { path: "hostUser" }
    // });
    const roomData = await Room.findById(roomId);
    res.json({ roomData: roomData })
})


module.exports = router;

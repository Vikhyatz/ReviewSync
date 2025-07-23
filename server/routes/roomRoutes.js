const express = require("express");
const Room = require("../models/Room");
const isLoggedIn = require("../middleware/loggedIn");
const User = require("../models/User");
const router = express.Router()

router.get("/getRooms/:userId", async (req, res) => {
    const userId = req.params.userId;

    console.log(userId)
    const userData = await User.findById(userId).populate({
        path: "joinedRooms",
        populate: { path: "hostUser" }
    });
    res.json({ rooms: userData.joinedRooms })
})

router.get("/getInfo/:roomId", async (req, res) => {
    const roomId = req.params.roomId;
    const roomData = await Room.findById(roomId).populate('hostUser');
    res.json({ roomData: roomData })
})

router.post("/joinRoom/:roomId/:userId", async (req, res) => {
    const roomId = req.params.roomId;
    const userId = req.params.userId;
    console.log(roomId)
    console.log(userId)

    try {
        const room = await Room.findOne({ roomId: roomId });
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { joinedRooms: room._id } }
        );
        const joinRoom = await Room.findByIdAndUpdate(
            room._id,
            { $addToSet: { joinedUsers: userId } }
        );
        if (!updateUser || !joinRoom) {
            return res.status(404).json({ error: "User or Room not found" });
        }
        res.status(200).json({ message: "User joined the room successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while joining the room" });
    }
})

router.post('/removeRoom/:roomId/:userId', async (req, res) => {
    const roomId = req.params.roomId;
    const userId = req.params.userId;

    const removeRoomFromuUser = await User.findByIdAndUpdate(
        userId,
        {
            $pull: { joinedRooms: roomId }
        }
    )

    removeUserFromRoom = await Room.findByIdAndUpdate(
        roomId,
        {
            $pull: { joinedUsers: userId }
        }
    )

    if (removeRoomFromuUser) res.status(200).json({ message: "remove room successfully" })
})

router.get("/checkUser/:userId/:roomId", async (req, res) => {
    const userId = req.params.userId;
    const roomId = req.params.roomId;

    const roomData = await Room.findById(roomId);
    console.log(roomData.joinedUsers)

    // check user in the joined users arr
    const check = roomData.joinedUsers.filter((users) => {
        return users == userId
    })

    if (check.length == 0) {
        res.status(401).json({ msg: "unauthorized" })
    }

    res.status(200).json({ msg: "authorized" })
})

router.post("/saveCode", async (req, res) => {
    console.log(req.body)
    const code = req.body.code;
    const roomId = req.body.roomId;

    try {
        const updateCode = await Room.findByIdAndUpdate(
            roomId,
            {
                fileText: code
            }
        )
        res.status(200).json({ msg: "code saved successfully" })
    } catch (err) {
        res.status(500).json({ msg: "internal server error" })
    }


})


module.exports = router;

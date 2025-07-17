const { v4: uuidv4 } = require("uuid")
const fs = require('fs');
const path = require('path');
const multer = require('multer')
const express = require("express");
const Room = require("../models/Room");
const isLoggedIn = require("../middleware/loggedIn");
const User = require("../models/User");
const router = express.Router();

// const Room = require('./models/Room')



// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'routes/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })



// uploading multer route handler
router.post("/", upload.single('file'), (req, res, next) => {
    if (!req.file) return res.status(400).send('No file uploaded');

    // create room id
    const roomId = uuidv4();

    // get room name
    const roomName = req.body.roomName

    const userId = req.body.userId

    // extract the text from the file
    const file = req.file;
    console.log(file.mimetype)

    if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }

    const filePath = path.join(__dirname, 'uploads', file.originalname);

    fs.readFile(filePath, 'utf-8', async (err, data) => {
        if (err) {
            return next(err);
        }

        // make a room name document, save the file text in the data
        const newRoom = new Room({
            roomId: roomId,
            roomName: roomName,
            fileText: data,
            fileType: file.mimetype,
            hostUser: userId,
            joinedUsers: [userId]
        });
        // newRoom.joinedUsers.push(anotherUserId);
        await newRoom.save()

        // update the room in the user's document too
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { $push: { joinedRooms: newRoom._id } },
            { new: true }
        );


        res.status(200).json({ created: newRoom })
    });

    // delete the file
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('File deleted successfully');
    });



    // redirect the user to the room page



})

module.exports = router
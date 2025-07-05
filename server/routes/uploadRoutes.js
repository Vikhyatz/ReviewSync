const { v4: uuidv4 } = require("uuid")
const fs = require('fs');
const path = require('path');
const multer = require('multer')
const express = require("express");
const Room = require("../models/Room");
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

    // create room name
    const roomName = uuidv4();

    


    // extract the text from the file
    const file = req.file;

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
            roomName: roomName,
            fileText: data,
        })
        await newRoom.save()
        // console.log(newRoom)
        res.status(200).json({ created: newRoom})
    });



    // redirect the user to the room page



})

module.exports = router
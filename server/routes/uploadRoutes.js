const fs = require('fs');
const { v4: uuidv4 } = require("uuid")
const path = require('path');
const multer = require('multer')
const express = require("express");
const Room = require("../models/Room");
const isLoggedIn = require("../middleware/loggedIn");
const User = require("../models/User");
const router = express.Router();

const { GoogleGenAI } = require("@google/genai");

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

        // give the code to gemini api, to save the reviewed code in the db
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })


        // query to give the api instructions
        const query = `
        You are a code reviewer. Given a code snippet, perform the following:

1. Return a **better version of the code** with improvements.
2. Don't even use markdown syntax, i just want the updated code.
3. add comments in the ending of the code about what did you optimize/improve/change in the code for better understanding.

the summary should be in comments strictly!

Respond strictly in the format told above just the code nothing else.

        this is the code: ${data}
        `;

        // response from the gemini api
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: query,
        });

        const resText = response.text;


        // make a room name document, save the file text in the data
        const newRoom = new Room({
            roomId: roomId,
            roomName: roomName,
            fileText: data,
            aiReviewedCode: resText,
            fileType: file.mimetype,
            hostUser: userId,
            joinedUsers: [userId]
        });
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
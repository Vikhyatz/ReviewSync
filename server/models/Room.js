const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    roomId: {type: String, required: true, unique: true},
    roomName: {type: String},
    fileText: {type: String},
    hostUser: {type: mongoose.Schema.ObjectId, ref: 'User'},
    joinedUsers: [
        {type: mongoose.Schema.ObjectId, ref: 'User'}
    ]
}, { timestamps: true })

module.exports = mongoose.model("Room", roomSchema)
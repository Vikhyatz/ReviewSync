const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    roomName: {type: String},
    roomId: {type: String, required: true, unique: true},
    fileText: {type: String},
    // hostUser: {type: String}
}, { timestamps: true })

module.exports = mongoose.model("Room", roomSchema)
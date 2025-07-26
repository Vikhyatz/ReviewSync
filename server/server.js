const express = require('express')
const http = require('http')
const { Server } = require("socket.io")
const session = require("express-session")
const passport = require("passport")
const cors = require("cors")
const { default: connectDb } = require('./connectDb')
const env = require('dotenv')

const authRouter = require("./routes/authRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const roomRoutes = require("./routes/roomRoutes")

const app = express()
const server = http.createServer(app)

env.config()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json())


// cors for socket server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

// socket io connection
io.on('connection', (socket) => {

  socket.on('codeChanged', (roomName, data) => {
    // update code to the joined room
    io.to(roomName).emit('update', data)
  });

  // join room
  socket.on("joinedRoom", (roomName)=>{
    // join room when opened review room on the client
    socket.join(roomName)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

connectDb();

app.use("/api/auth", authRouter)
app.use("/api/upload", uploadRoutes)
app.use("/api/rooms", roomRoutes)


const port = process.env.PORT
server.listen(port, ()=>{
  console.log("example app listening on port 5000")
})
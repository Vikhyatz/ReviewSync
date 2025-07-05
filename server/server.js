const express = require('express')
const session = require("express-session")
const passport = require("passport")
const cors = require("cors")
const { default: connectDb } = require('./connectDb')
const env = require('dotenv')

const authRouter = require("./routes/authRoutes")
const uploadRoutes = require("./routes/uploadRoutes")

const app = express()
env.config()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json())

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


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
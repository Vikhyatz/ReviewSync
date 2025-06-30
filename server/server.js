const express = require('express')
const session = require("express-session")
const passport = require("passport")
const cors = require("cors")
const { default: connectDb } = require('./connectDb')
const authRouter = require("./routes/authRoutes")
const env = require('dotenv')

const app = express()
env.config()

app.use(cors({origin: "http://localhost:5173/", Credentials: true}))
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

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
"use strict" // enable strict mode
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const router = require('./router')

// middlewares
app.use(cors({origin: [process.env.FRONTEND_URL]}))
app.use(express.json())
// global error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "someting went wrong" });
});
app.use("/", router);
// test endpoint
app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});


// listen app
app.listen(PORT,()=> {
    console.log(`Listening on port ${PORT}`)
})
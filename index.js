const express = require("express");
const mongoose = require("mongoose");

// setup express server 

const app = express();

// sudo npm install -g --force nodemon
// nodemon index
// can use npm run dev, npm run start after we set package.json with scripts
app.listen(5001, () => console.log("Server started on port 5001") );

app.get("/test", (req, res) => {
    console.log("Test the test path")
    res.send("Hello world3dfd33")
})
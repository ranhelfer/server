const express = require("express");
const mongoose = require("mongoose");

// setup express server 

const app = express();

// For any request run this function 
app.use(express.json());

// sudo npm install -g --force nodemon
// nodemon index
// npm run start after we set package.json with scripts
// if we want automatic rerun after save we can run --> can use npm run dev, 
// This script is defined in package.json as nodemon

// lsof -i :5000 --> Will list the pid of which jobs are running on this port

app.listen(5001, () => console.log("Server started on port 5001") );

// app.get("/test", (req, res) => {
//     console.log("The end point was hit")
//     res.send("Hello world3dfd33")
// })

// set router

app.use("/snippet", require("./routers/snippetRouter"));
const express = require("express");
const mongoose = require("mongoose"); //  rhelfer i8zLCVTjorWxk2zp
const dotenv = require("dotenv"); // using .env file to secure mongoDB access string

dotenv.config();

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


// Set mongoose remove data base 

// Node has env environment
const uri = process.env.CONNECT_URI;
const uri_user =   "mongodb+srv://new_user_test:3ADDM2pnfeEHHa1Y@snippet-cluster.r9zxe.mongodb.net/?retryWrites=true&w=majority&appName=snippet-cluster"

mongoose.connect(uri);


////const conn = mongoose.createConnection(uri);

//conn.on('connected', () => console.log('mongoose connected'));
//conn.on('open', () => console.log('mongoose open'));
//conn.on('disconnected', () => console.log('mongoose disconnected'));
//conn.on('reconnected', () => console.log('mongoose reconnected'));
//conn.on('disconnecting', () => console.log('mongoose disconnecting'));
//conn.on('close', () => console.log('mongoose close'));


const router = require("express").Router();
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");


router.post("/",async (req, res) => {
    try {
        const {email, password, passwordVerify} = req.body

        // validation

        if (!email || !password || !passwordVerify) {
            return res.status(400).json({
                errorMessage: "Missing required fields"
           });
        }

        if (password.length < 6) {
            return res.status(400).json({
                errorMessage: "Too short password"
           });
        }

        if (password != passwordVerify ) {
            return res.status(400).json({
                errorMessage: "Please enter same passwords twice"
           });
        }

       const existingUser = await User.findOne( { email } );
    
       if (existingUser) {
            console.log(existingUser);
            return res.status(400).json({
                errorMessage: "user exists"
           });
       }

       // npm install bcryptjs

       const salt = await bcrypt.genSalt(); 

       const passwordHash = await bcrypt.hash(password, salt);

       console.log(passwordHash)

       // save user data

       const newUser = new User({
            email,
            passwordHash
       });

       // Mongo db user
       const savedUser = await newUser.save();


       res.send(savedUser);

       // create jwt token

    } catch (err) {
        console.log({err})
        return res.status(500).json({
            // error: err.message || "An error occurred" // You do not want to return the actual error
            error: "An error occurredcsdd"
        });
    }
})

module.exports = router;
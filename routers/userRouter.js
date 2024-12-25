const router = require("express").Router();
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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
            console.log("user exist");
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

       // npm i jsonwebtoken
       // create jwt token

       const jwtData = {
            id: savedUser._id
       }

       const token = jwt.sign(jwtData, process.env.JWT_SECRET);

       console.log("Create token:")
       console.log(token)

       // 
       const isEnvProduction = process.env.NODE_ENV === "production" 

       res.cookie("token", token, { httpOnly: true, 
                                    sameSite: isEnvProduction ? "none" : "lax", 
                                    secure: isEnvProduction,
                                    maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
                                });

       res.send({ success: true, message: "Token cookie set successfully" });

    } catch (err) {
        console.log({err})
        return res.status(500).json({
            // error: err.message || "An error occurred" // You do not want to return the actual error
            error: "An error occurredcsdd"
        });
    }
})


router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body

        // validation
        console.log("login with " + email +  "pass: " + password)
        if (!email || !password) {
            return res.status(400).json({
                errorMessage: "Missing required fields"
           });
        }

       const existingUser = await User.findOne( { email } );
    
       if (!existingUser) {
            return res.status(401).json({
                errorMessage: "wrong email or password"
           });
       }

       const correctPassword = await bcrypt.compare(password, existingUser.passwordHash);

       if (!correctPassword) {
            return res.status(401).json({
                errorMessage: "wrong email or password"
            });
        }

       const jwtData = {
            id: existingUser._id
       }

       const token = jwt.sign(jwtData, process.env.JWT_SECRET);

       console.log("Create token:")
       console.log(token)
 
       const isEnvProduction = process.env.NODE_ENV === "production" 

       res.cookie("token", token, { httpOnly: true, 
                                    sameSite: isEnvProduction ? "none" : "lax" , 
                                    secure: isEnvProduction,
                                    maxAge: 24 * 60 * 60 * 1000 }
                  );
                  
        res.send({ success: true, message: "Token cookie set successfully" });


    } catch (err) {
        console.log({err})
        return res.status(500).json({
            // error: err.message || "An error occurred" // You do not want to return the actual error
            error: "An error occurred"
        });
    }
});


router.get("/loggedIn", (req, res) => {

    try {

        const token = req.cookies.token;
        console.log("loggedIn:// i am getting token " + token);
        if (!token) {
            return res.json(null);
        }

        const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
        console.log("user logged " + validatedUser.id)
        return res.json(validatedUser.id);
    } catch (err) {
        console.log(err)
        return res.json(null);
    }
});

router.get("/logout", (req, res) => {
    try {
        console.log("loging out")
        res.clearCookie("token").send();
    } catch (err) {
        console.log(err)
        return res.json(null);
    }
});

module.exports = router;
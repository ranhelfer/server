const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    console.log("middle ware works");

    // Validate user

    try {

        const token = req.cookies.token;
        console.log("Received token:", token);

        if (!token) {
            return res.status(401).json({
                error: "Unauthorized no token"
            })
        }

        //console.log(process.env.JWT_SECRET);

        const validatedUser = jwt.verify(token, process.env.JWT_SECRET);

         req.user = validatedUser.id;

        next();

    } catch (err) {
        console.log(err)
        return res.status(401).json({
            error: "Unauthorized"
        })
    }

}

module.exports = auth;


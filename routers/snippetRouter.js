const router = require("express").Router();
const Snippet = require("../models/snippetModel");

router.get("/test", (req, res) => {
    res.send("Router test")
});

router.post("/", async (req, res) => {
    const bodyPrint = req.body;

    console.log(bodyPrint); // --> undefined if we wont't use: app.use(express.json());
    
    const {title, description, code} = req.body

    // validation

    if(!description && !code) {
        return res.status(400).json({
             errorMessage: "You need to enter description or some code"
        })
    }
    
    console.log("title is --> " + title);
    console.log("description is --> " + description);
    console.log("code is --> " + code);

    const newSnippet = new Snippet({
        title, description, code
    });

    // This takes time
    try {
        const savedSnippet = await newSnippet.save();

        res.send(savedSnippet)
    } catch (err) {
        console.log({err})
        return res.status(500).json({
            // error: err.message || "An error occurred" // You do not want to return the actual error
            error: "An error occurred"
        })
    }
});


module.exports = router;

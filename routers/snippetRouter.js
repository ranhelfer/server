const router = require("express").Router();

router.get("/test", (req, res) => {
    res.send("Router test")
});

router.post("/", (req, res) => {
    const bodyPrint = req.body;

    console.log(bodyPrint); // --> undefined if we wont't use: app.use(express.json());
    
    const {title, description, code} = req.body

    
    console.log("title is --> " + title);
    console.log("description is --> " + description);
    console.log("code is --> " + code);


    res.send("Router post hit")
});


module.exports = router;

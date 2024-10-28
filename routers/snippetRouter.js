const router = require("express").Router();

router.get("/test", (req, res) => {
    res.send("Router test")
});

router.post("/", (req, res) => {
    const body = req.body;
    console.log(body); // --> undefined if we wont't use: app.use(express.json());
    res.send("Router post hit")
});


module.exports = router;

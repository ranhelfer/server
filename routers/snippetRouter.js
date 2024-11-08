const router = require("express").Router();
const Snippet = require("../models/snippetModel");

router.get("/", async (req, res) => {
    try {
        const snippets = await Snippet.find();
        res.json(snippets)
    } catch (err) {
        console.log({err})
        return res.status(500).json({
            error: "An error occurred"
        })
    }
});

router.post("/", async (req, res) => {
    const bodyPrint = req.body;

    console.log(bodyPrint); // --> undefined if we wont't use: app.use(express.json());
    
    const {title, description, code} = req.body

    // validation

    if(!description && !code) {
        return res.status(400).json({
             errorMessage: "You need to enter description or some code"
        });
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

        res.send(savedSnippet);
    } catch (err) {
        console.log({err})
        return res.status(500).json({
            // error: err.message || "An error occurred" // You do not want to return the actual error
            error: "An error occurred"
        });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const snippetId = req.params.id;

        // Validation

        if(!snippetId) {
            return res.status(400).json({
                 errorMessage: "No deletion id"
            });
        }

        const existingSnippet = await Snippet.findById(snippetId);

        if(!existingSnippet) {
            return res.status(400).json({
                 errorMessage: "No existing record for such id"
            });
        }

        await existingSnippet.deleteOne();
        //await existingSnippet.delete();

        console.log(existingSnippet);
        res.json(existingSnippet);
    } catch (err) {
        console.log({err})
        return res.status(500).json({
            error: "An error occurred"
        });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const snippetId = req.params.id;
        const {title, description, code} = req.body;

        // Validation

        if(!snippetId) {
            return res.status(400).json({
                 errorMessage: "No update id"
            });
        }

        // Validation

        if(!description && !code) {
            return res.status(400).json({
                 errorMessage: "You need to enter description or some code"
            });
        }

        const existingSnippet = await Snippet.findById(snippetId);

        if(!existingSnippet) {
            return res.status(400).json({
                 errorMessage: "No existing record for such id"
            });
        }

        existingSnippet.title = title;
        existingSnippet.code = code;
        existingSnippet.description = description;
        
        await existingSnippet.save();

        console.log(existingSnippet);
        res.json(existingSnippet);
    } catch (err) {
        console.log({err})
        return res.status(500).json({
            error: "An error occurred"
        });
    }
});


module.exports = router;

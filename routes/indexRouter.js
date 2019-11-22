const router = require("express").Router();


// home route
router.get("/", async (req, res) => {
    return res.render("home")
});

module.exports = router;
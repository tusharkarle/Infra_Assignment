const express = require("express");

//1.create a new router
const router =express.Router();

//2. we need to define the router
router.get("/thapa", (req, res) => {
    res.send("Hello whatsupp guys");
});


module.exports = router;


// always use router for more complex data

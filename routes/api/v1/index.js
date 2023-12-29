const express = require("express");
const speciesRoutes = require("./species");

const router = express.Router();
router.use("/species", speciesRoutes);

module.exports = router;
const express = require("express");
const speciesRoutes = require("./species");
const spawnsRoutes = require("./spawns");

const router = express.Router();
router.use("/species", speciesRoutes);
router.use("/spawns", spawnsRoutes);

module.exports = router;
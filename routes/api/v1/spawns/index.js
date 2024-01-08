const express = require("express");
const spawnsController = require("../../../../controllers/spawns")

const router = express.Router();

router.get("/:name", spawnsController.getAllFor);

module.exports = router;
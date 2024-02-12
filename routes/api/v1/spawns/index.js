const express = require("express");
const spawnsController = require("../../../../controllers/spawns")

const router = express.Router();

router.get("/:name", spawnsController.getAllFor);
router.post("/search", spawnsController.search);

module.exports = router;
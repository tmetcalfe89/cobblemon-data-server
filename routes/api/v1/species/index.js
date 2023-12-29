const express = require("express");
const speciesController = require("../../../../controllers/species")

const router = express.Router();

router.post("/", speciesController.getAll);
router.get("/name/:name", speciesController.getByName);

module.exports = router;
require("dotenv").config();

const path = require("path");
const fs = require("fs").promises;
const mongoose = require("mongoose");
const SpeciesModel = require("../models/Species");
const walkPromised = require("../util/walkDir");
const { parseSpecies } = require("../util/parsers");

const {
  MONGO_URI
} = process.env;
const TARGET_DIR = path.join(__dirname, "../raw")

mongoose.connect(MONGO_URI)
  .then(async () => {
    return await SpeciesModel.deleteMany({});
  })
  .then(async () => {
    return fs.readdir(TARGET_DIR);
  })
  .then(async (versions) => {
    await Promise.all(versions.map(async (version) => {
      const files = await walkPromised(path.join(TARGET_DIR, version, "common/src/main/resources/data/cobblemon/species"));
      await Promise.all(files.map(async (file) => {
        const data = parseSpecies(await JSON.parse(await fs.readFile(file, { encoding: "utf-8" })))
        await SpeciesModel.create({ ...data, version });
      }))
    }))
  })
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
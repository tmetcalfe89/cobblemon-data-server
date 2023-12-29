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
        const data = await JSON.parse(await fs.readFile(file, { encoding: "utf-8" }))
        const mainFormDoc = await SpeciesModel.create(parseSpecies({ ...data, version, forms: [] }));
        await Promise.all(data.forms?.map(async form => {
          const formData = parseSpecies({ ...data, ...form, name: data.name, form: form.name });
          const formDoc = await SpeciesModel.create({ ...formData, version, forms: [] });
          mainFormDoc.forms.push(formDoc._id);
        }) || []);
        await mainFormDoc.save();
      }))
    }))
  })
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
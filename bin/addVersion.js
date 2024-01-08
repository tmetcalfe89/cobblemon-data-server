require("dotenv").config();

const path = require("path");
const fs = require("fs").promises;
const mongoose = require("mongoose");
const SpeciesModel = require("../models/Species");
const SpawnModel = require("../models/Spawn");
const walkPromised = require("../util/walkDir");
const { parseSpecies, parseSpawns } = require("../util/parsers");

const {
  MONGO_URI
} = process.env;
const TARGET_DIR = path.join(__dirname, "../raw")

const loadSpecies = (versions) => Promise.all(versions.map(async (version) => {
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
}));

const loadSpawns = (versions) => Promise.all(versions.map(async (version) => {
  const files = await walkPromised(path.join(TARGET_DIR, version, "common/src/main/resources/data/cobblemon/spawn_pool_world"));
  await Promise.all(files.map(async (file) => {
    const data = await JSON.parse(await fs.readFile(file, { encoding: "utf-8" }))
    await Promise.all(parseSpawns(data).map(spawn => SpawnModel.create({ ...spawn, version })));
  }))
}));

mongoose.connect(MONGO_URI)
  .then(async () => {
    await SpeciesModel.deleteMany({});
    await SpawnModel.deleteMany({});
  })
  .then(async () => {
    return fs.readdir(TARGET_DIR);
  })
  .then(async (versions) => {
    await Promise.all([loadSpecies(versions), loadSpawns(versions)])
  })
  .then(() => {
    console.log("Done");
    process.exit(0);
  })

const SpeciesModel = require("../models/Species");

const findOne = (filter) => SpeciesModel.findOne({ ...filter, form: { $exists: false } }).populate({ path: "forms", select: "_id name form" });
const findMany = (filter) => SpeciesModel.find({ ...filter, form: { $exists: false } }).select("name sname nationalPokedexNumber");

module.exports = {
  getAll: async (req, res) => {
    const { filter } = req.body;
    const results = await findMany(filter);
    res.json(results);
  },
  getByName: async (req, res) => {
    const { name } = req.params;
    const results = await findOne({ sname: name });
    res.json(results);
  },
  getByNationalDexNumber: async (req, res) => {
    const { ndex } = req.params;
    const results = await findOne({ nationalPokedexNumber: ndex });
    res.json(results);
  }
}
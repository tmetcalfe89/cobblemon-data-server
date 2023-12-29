const SpeciesModel = require("../models/Species");

module.exports = {
  getAll: async (req, res) => {
    const { filter } = req.body;
    const results = await SpeciesModel.find(filter, "name nationalPokedexNumber");
    res.json(results);
  },
  getByName: async (req, res) => {
    const { name } = req.params;
    const results = await SpeciesModel.findOne({ name });
    res.json(results);
  }
}
const SpawnModel = require('../models/spawn');

module.exports = {
  getAllFor: async (req, res) => {
    const { name } = req.params;
    const [actualName, ...aspects] = name.split(' ');
    const results = await SpawnModel.find({
      pokemon: {
        name: actualName,
        aspects
      }
    });
    res.json(results);
  }
}
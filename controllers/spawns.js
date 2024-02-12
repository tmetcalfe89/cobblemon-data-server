const SpawnModel = require('../models/Spawn');

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
  },
  search: async (req, res) => {
    const pageSize = 20;
    const { page = 0 } = req.query;
    const { filter = {}, include = [] } = req.body || {};
    const results = await SpawnModel.aggregate(
      [
        {
          $lookup: {
            as: 'species',
            from: 'species',
            foreignField: 'sname',
            localField: 'sname'
          }
        },
        {
          $unwind: {
            path: "$species",
          }
        },
        {
          $addFields: {
            "species.drops": {
              $ifNull: ["$drops", "$species.drops"]
            }
          }
        },
        { $match: filter },
        {
          $sort: {
            sname: 1
          }
        },
        { $skip: page * pageSize },
        { $limit: pageSize },
        {
          $project: {
            pokemon: 1,
            ...include.reduce((acc, k) => ({ ...acc, [k]: 1 }), {})
          }
        }
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    );
    res.json(results);
  }
}
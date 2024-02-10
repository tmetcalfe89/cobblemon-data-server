require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const handlebars = require("express-handlebars");
const routes = require("../routes");
const ifError = require("../util/ifError");
const spawnsModel = require("../models/Spawn");

const app = express();

const { MONGO_URI, PORT = 3000 } = process.env;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(express.static("./public"));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', async (req, res) => {
  const { q = btoa("{}") } = req.query;
  const filter = ifError(() => JSON.parse(atob(q)), {});
  const results = await spawnsModel.aggregate(
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
      { $project: { pokemon: 1, ...Object.keys(filter).reduce((acc, k) => ({ ...acc, [k]: 1 }), {}) } }
    ],
    { maxTimeMS: 60000, allowDiskUse: true }
  );
  res.render('search', { results });
});

mongoose.connect(MONGO_URI);
app.listen(PORT);
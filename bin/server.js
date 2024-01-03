require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const routes = require("../routes");
const cors = require("cors");

const app = express();

const { MONGO_URI, PORT = 3000 } = process.env;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect(MONGO_URI);
app.listen(PORT);
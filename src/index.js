const express = require("express");
const cors = require("cors");
const { routes: frequencyData } = require("./routes/high_frequency_data");
const app = express();
require("./config/db");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", frequencyData);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Api RESTFul Ok, y ejecutándose...");
});

module.exports = app;

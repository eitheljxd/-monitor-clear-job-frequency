const Sequelize = require("sequelize");
const frequencyModels = require("../models/high_frequency_data");
const { config } = require("aws-sdk");

const { getSecrets } = require("../utils/utils.env");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
  }
);

sequelize.beforeConnect(async (config) => {
  const databaseKeys = await getSecrets(process.env.DATABASE_PDM);
  config.username = databaseKeys.username;
  config.password = databaseKeys.password;
  config.database = databaseKeys.dbname;
  config.host = databaseKeys.host;
});

const frequency = frequencyModels(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("Tabla sincronizadas");
});

module.exports = {
  frequency,
};

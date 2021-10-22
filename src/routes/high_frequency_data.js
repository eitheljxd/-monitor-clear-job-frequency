const express = require("express");
const { frequency } = require("../config/db");
const moment = require("moment");

const routes = express.Router({
  mergeParams: true,
});

const { Sequelize } = require("sequelize");

routes.get("/", async (req, res) => {
  const date = moment().subtract("1", "day").format("YYYY-MM-DD");
  let result = await getFrenquencies(date);
  console.warn(
    `Se borrará ${result.length} registro(s) creado(s) antes de la fecha ${date}`
  );
  const ids = await getIds(result);
  // await deleteMqqt(ids);
  res.json({
    success: true,
    rows_affected: result.length,
    messages: `Se borro ${result.length} registro(s) creado(s) antes de la fecha ${date}`,
  });
});
async function getFrenquencies(date) {
  const sequelize = Sequelize;
  return await frequency.findAll({
    limit: 100000,

    where: sequelize.where(
      sequelize.fn("DATE", sequelize.col("create_date")),
      "<=",
      date
    ),

    // where: {
    //   create_date: {
    //     [Op.lte]: date,
    //   },
    // },
  });
}
async function deleteMqqt(ids) {
  return await Mqqt.destroy({
    where: {
      row_topic: ids,
    },
  });
}
async function getIds(topics) {
  let ids = [];
  topics.forEach((element) => {
    ids.push(element.dataValues.row_topic);
  });
  return ids;
}
module.exports = {
  routes,
};

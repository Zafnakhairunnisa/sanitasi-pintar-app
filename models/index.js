const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../database.sqlite"),
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Report = require("./Report")(sequelize, Sequelize);
db.WaterQuality = require("./WaterQuality")(sequelize, Sequelize);
db.WasteManagement = require("./WasteManagement")(sequelize, Sequelize);

module.exports = db;

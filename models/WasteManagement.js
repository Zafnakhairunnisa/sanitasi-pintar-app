module.exports = (sequelize, DataTypes) => {
  const WasteManagement = sequelize.define("WasteManagement", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    organicWaste: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    plasticWaste: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paperWaste: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    metalWaste: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  return WasteManagement;
};

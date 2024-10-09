module.exports = (sequelize, DataTypes) => {
  const WaterQuality = sequelize.define("WaterQuality", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ph: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    turbidity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ecoli: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return WaterQuality;
};

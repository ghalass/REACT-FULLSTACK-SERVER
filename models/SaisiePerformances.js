module.exports = (sequelize, DataType) => {
  const SaisiePerformances = sequelize.define("SaisiePerformances", {
    hrm: {
      type: DataType.FLOAT,
      validate: { min: 0, max: 24 },
      allowNull: false,
    },
    him: {
      type: DataType.FLOAT,
      validate: { min: 0, max: 24 },
      allowNull: false,
    },
    ni: {
      type: DataType.TINYINT,
      allowNull: false,
    },
    nho: {
      type: DataType.FLOAT,
      validate: { min: 0, max: 24 },
      allowNull: false,
    },
  });
  // SaisiePerformances.belongsTo(models.SaisieEngins, {
  //   onDelete: "cascade",
  // });

  return SaisiePerformances;
};

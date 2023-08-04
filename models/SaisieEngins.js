module.exports = (sequelize, DataType) => {
  const SaisieEngins = sequelize.define("SaisieEngins", {
    dateSaisie: {
      type: DataType.DATE,
      allowNull: false,
    },
    enginId: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  SaisieEngins.associate = (models) => {
    SaisieEngins.hasMany(models.SaisiePerformances, {
      onDelete: "cascade",
    });
  };

  return SaisieEngins;
};

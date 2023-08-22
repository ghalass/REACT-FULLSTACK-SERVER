module.exports = (sequelize, DataType) => {
  const Sites = sequelize.define("Sites", {
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
    description: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  Sites.associate = (models) => {
    Sites.hasMany(models.Engins, {
      onDelete: "cascade",
    });
  };

  return Sites;
};

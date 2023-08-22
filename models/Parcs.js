module.exports = (sequelize, DataType) => {
  const Parcs = sequelize.define("Parcs", {
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
    description: {
      type: DataType.STRING,
      allowNull: false,
    },
  });
  Parcs.associate = (models) => {
    Parcs.hasMany(models.Engins, {
      onDelete: "cascade",
    });
    Parcs.belongsTo(models.TypeParcs, {
      onDelete: "cascade",
    });
  };

  return Parcs;
};

module.exports = (sequelize, DataType) => {
  const Engins = sequelize.define("Engins", {
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
    description: {
      type: DataType.STRING,
      allowNull: false,
    },
  });
  Engins.associate = (models) => {
    Engins.belongsTo(models.Parcs, {
      onDelete: "cascade",
    });
    Engins.belongsTo(models.Sites, {
      onDelete: "cascade",
    });
  };

  return Engins;
};

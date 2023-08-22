module.exports = (sequelize, DataType) => {
  const TypeParcs = sequelize.define("TypeParcs", {
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  TypeParcs.associate = (models) => {
    TypeParcs.hasMany(models.Parcs, {
      onDelete: "cascade",
    });
  };

  return TypeParcs;
};

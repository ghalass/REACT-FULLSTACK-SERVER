module.exports = (sequelize, DataType) => {
  const TypeParcs = sequelize.define("TypeParcs", {
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  return TypeParcs;
};

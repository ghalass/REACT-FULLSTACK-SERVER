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

  return Parcs;
};

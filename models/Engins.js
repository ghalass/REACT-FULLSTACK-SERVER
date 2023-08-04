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

  return Engins;
};

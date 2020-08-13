module.exports = (sequlize, Datatypes) =>{
  const Measurements = sequlize.define('measurements', {
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      type: Datatypes.INTEGER
    },
    userId: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    muac: {
      type: Datatypes.DOUBLE,
      allowNull: false
    }
  });

  Measurements.associate = (model) => {
    Measurements.belongsTo(model.User, { foreignKey: 'userId' });
  };

  return Measurements;
}
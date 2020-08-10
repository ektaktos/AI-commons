module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define('user', {
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      type: Datatypes.INTEGER
    },
    name: {
      allowNull: false,
      type: Datatypes.STRING
    },
    phone: {
      allowNull: false,
      type: Datatypes.STRING
    }
  });

  User.associate = (model) => {
    User.hasMany(model.Measurements, { onDelete:  'cascade'});
  };

  return User;
}
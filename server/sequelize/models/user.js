export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {},
  );
  return User;
};

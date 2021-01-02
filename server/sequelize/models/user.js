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
  User.associate = (models) => {
    User.hasMany(models.Contacts, {
      foreignKey: 'userId',
      as: 'contact',
      onDelete: 'CASCADE',
    });
  };
  return User;
};

export default (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contacts', {
      names: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING
    }, {},
  );
  Contact.associate = (models) => {
    Contact.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return Contact;
};

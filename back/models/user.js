module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  }, { // id, createdAt, updatedAt 자동 추가됨.
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글 저장
  });

  User.associate = (db) => {

  };
  return User;
}
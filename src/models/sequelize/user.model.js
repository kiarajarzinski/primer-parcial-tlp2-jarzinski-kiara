import { DataTypes } from "sequelize";

export const UserModel = sequelize.define("User", {
  username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: {
    type: DataTypes.ENUM("secretary", "administrator"),
    allowNull: false,
    defaultValue: "secretary",
  },
});

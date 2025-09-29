import { DataTypes } from "sequelize";

export const CategoryModel = sequelize.define("Category", {
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true },
});

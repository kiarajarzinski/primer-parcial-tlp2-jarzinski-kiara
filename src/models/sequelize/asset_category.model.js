import { DataTypes } from "sequelize";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA
Asset.belongsToMany(Category, {
  through: AssetCategory,
  foreignKey: "asset_id",
  as: "categories",
  onDelete: 'CASCADE'
});
Category.belongsToMany(Asset,{
  through: AssetCategory,
  foreignKey: "category_id",
  as: "assets",
  onDelete: 'CASCADE',

}

);
AssetCategory.belongsTo(Asset,{
  foreignKey: "asset_id",
  as: "asset"
});

AssetCategory.belongsTo(Category,{
  foreignKey: "category_id",
  as: "category"
});
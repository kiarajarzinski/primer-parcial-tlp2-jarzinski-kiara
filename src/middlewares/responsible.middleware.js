import { AssetModel } from "../models/mongoose/asset.model";

// * middleware para verificar si el usuario autenticado es responsable de un recurso
export const responsibleMiddleware = async (req, res, next) => {
  try {
    const assetId = req.params.id;
    const foundAsset = await AssetModel.findById(assetId);
    if (!foundAsset)
      return res.status(404).json({ msg: "Recurso no encontrado" });

    if (String(foundAsset.responsible) !== String(req.user.id))
      return res
        .status(403)
        .json({ msg: "No tienes permisos para acceder a este recurso" });

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Error Interno del servidor" });
  }
};

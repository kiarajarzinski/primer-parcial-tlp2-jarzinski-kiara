import { Router } from "express";
import {
  createAsset,
  deleteAsset,
  getAllAssets,
  getMyAssets,
} from "../controllers/assets.controller.js";
import { createAssetValidation } from "../middlewares/validations/asset.validations.js";
import { validator } from "../middlewares/validator.middleware.js";

export const assetRoutes = Router();

// TODO: proteger las rutas con middlewares de autenticación y autorización faltantes

// * crear un recurso (usuario autenticado)
assetRoutes.post("/assets", createAssetValidation, validator, createAsset);

// * traer todos los recursos (usuario autenticado que sea admin)
assetRoutes.get("/assets", getAllAssets);

// * traer mis recursos (usuario autenticado que sea responsible)
assetRoutes.get("/assets/my-assets", getMyAssets);

// * eliminar un recurso por id (usuario autenticado que sea responsible)
assetRoutes.delete("/assets/:id", deleteAsset);

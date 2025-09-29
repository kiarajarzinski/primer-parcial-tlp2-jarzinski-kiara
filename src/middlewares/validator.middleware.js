import { validationResult } from "express-validator";

// * middleware para validar los datos de entrada de express-validator
export const validator = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.mapped() });
  }

  next();
};

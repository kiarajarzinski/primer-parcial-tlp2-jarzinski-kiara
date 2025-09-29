import { validationResult } from "express-validator";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePasswords } from "../helpers/bcrypt.helper.js";
import UserModel from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;

    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      profile: {
        employee_number: profile.employee_number,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
      }
    });
    return res.status(201).json({ 
      msg: "Usuario registrado correctamente",
       user: newUser.username,
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {

     const user = await UserModel.findOne({
      username: username,
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        msg: "El usuario o la contraseña no coinciden",
      });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        msg: "El usuario o la contraseña no coinciden",
      });
    }
    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      msg: "Se inicio sesión correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};


export const getProfile = async (req, res) => {
   console.log("usuario autenticado", req.user);
  const userId = req.user.id;

  try {
    const userConProfile = await UserModel.findById(userId).select("-password");

    if (!userConProfile) {
      return res
        .status(404)
        .json({
          message:
            "Usuario no encontrado en la base de datos.",
        });
    }

    return res.status(200).json(userConProfile);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const logout = async (_req, res) => {
   try {
    res.clearCookie("token");
    return res.json({
      msg: "Se cerró sesión exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

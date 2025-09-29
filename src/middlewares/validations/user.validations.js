export const createUserValidation = [
    body('username')
    .trim()
    .notEmpty().withMessage('El username es obligatorio')
    .isLength({min: 3, max: 20}).withMessage('El username debe contener entre 3 y 20 caracteres')
    .custom(async(value)=>{
        const user = await UserModel.findOne({ username: value});
        if (user) {
            throw new Error('El username ya está en uso')
        }
    }),

    body('email')
    .trim()
    .isEmail().withMessage('El formato no es válido')
    .normalizeEmail()
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error('El email ya está en uso');
      }
    }),

    body('password')
    .isLength({min :8}).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('La contraseña debe tener al menos una mayúscula, una minúscula y un número'),

    body('role')
    .optional()
    .isIn(['secretary', 'administrador']).withMessage('Rol inválido')

]


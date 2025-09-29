import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a la base de datos");
    // * para borrar la base de datos en cada inicio
    // await mongoose.connection.dropDatabase();
  } catch (error) {
    console.log("Error al conectarse a la base de datos:", error);
  }
};

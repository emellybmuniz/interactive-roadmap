import mongoose from "mongoose";
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log("Usando conexão MongoDB cacheada.");
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    console.log("Criando nova conexão com o MongoDB...");
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB conectado com sucesso!");
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
  return cached.conn;
};

export default connectDB;

import mongoose from "mongoose";
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}


const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB conectado com sucesso!");
      return mongoose;
    });
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB desconectado!");
  });
  mongoose.connection.on("error", (error) => {
    console.error("Erro na conexão com o MongoDB:", error);
  });
};

export default connectDB;

import "dotenv/config";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import roadmapRoutes from "./routes/roadmap.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const requiredEnvVars = [
  "GEMINI_API_KEY",
  "MONGODB_URI",
  "JWT_SECRET",
  "SESSION_SECRET",
];
const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error(
    "ERRO: As seguintes variáveis de ambiente estão faltando:",
    missingEnvVars.join(", ")
  );
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(__dirname));

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 15,
  message:
    "Muitas requisições foram enviadas em um curto espaço de tempo, por favor, tente novamente em um minuto.",
  standardHeaders: true,
  legacyHeaders: false,
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Muitas tentativas de login. Tente novamente em 15 minutos.",
  skipSuccessfulRequests: true,
});

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/roadmap", roadmapRoutes);

app.post("/api/gemini", apiLimiter, async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "O prompt é obrigatório" });
    }
    const result = await model.generateContent(prompt);
    const response = result.response;
    res.json({ text: response.text() });
  } catch (error) {
    console.error("Erro ao chamar a API do Gemini:", error);
    res.status(500).json({ error: "Falha ao chamar a API do Gemini" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Servidor funcionando!",
    timestamp: new Date().toISOString(),
  });
});

app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({
    success: false,
    message:
      "Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
  });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`\nServidor rodando em http://localhost:${port}`);
    console.log(`Acesse http://localhost:${port}/index.html no navegador\n`);
  });
}

export default app;

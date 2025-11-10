import jwt from "jsonwebtoken";
const { verify, sign } = jwt;

import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res
        .status(401)
        .json({
          error: "Não autorizado, Por favor, faça login e tente novamente.",
        });
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ error: "Usuário não encontrado." });
      }
      next();
    } catch (error) {
      return res
        .status(401)
        .json({
          error:
            "Token inválido ou expirado. Por favor, tente novamente mais tarde.",
        });
    }
  } catch (error) {
    console.error("Erro na autenticação do usuário:", error);
    res.status(500).json({
      success: false,
      message: "Erro no servidor. Por favor, tente novamente mais tarde.",
    });
  }
};
const generateToken = (userId) => {
  return sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default { protect, generateToken };

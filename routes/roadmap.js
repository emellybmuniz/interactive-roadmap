import { Router } from "express";
import Roadmap from "../models/Roadmap.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();
const { protect } = authMiddleware;

router.use(protect);

// @route   GET /api/roadmap
// @desc    Obter roadmap do usuário logado
// @access  Private
router.get("/", async (req, res) => {
  try {
    let roadmap = await Roadmap.findOne({ userId: req.user._id });

    if (!roadmap) {
      return res.status(404).json({ success: false, message: "Roadmap não encontrado." });
    }

    res.status(200).json({
      success: true,
      roadmap: roadmap.roadmapData,
    });
  } catch (error) {
    console.error("Erro ao buscar roadmap:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao buscar roadmap",
      error: error.message,
    });
  }
});

// @route   PUT /api/roadmap
// @desc    Atualizar roadmap do usuário
// @access  Private
router.put("/", async (req, res) => {
  try {
    const { roadmapData } = req.body;

    if (!roadmapData) {
      return res.status(400).json({
        success: false,
        message: "Dados do roadmap são obrigatórios",
      });
    }

    let roadmap = await Roadmap.findOne({ userId: req.user._id });

    if (!roadmap) {
      roadmap = await Roadmap.create({
        userId: req.user._id,
        roadmapData,
      });
    } else {
      roadmap.roadmapData = roadmapData;
      await roadmap.save();
    }

    res.status(200).json({
      success: true,
      message: "Roadmap atualizado com sucesso!",
      roadmap: roadmap.roadmapData,
    });
  } catch (error) {
    console.error("Erro ao atualizar roadmap:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar roadmap",
      error: error.message,
    });
  }
});

// @route   DELETE /api/roadmap/reset
// @desc    Resetar roadmap para o padrão
// @access  Private
router.delete("/reset", async (req, res) => {
  try {
    let roadmap = await Roadmap.findOne({ userId: req.user._id });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap não encontrado",
      });
    }

    await roadmap.save();

    res.status(200).json({
      success: true,
      message: "Roadmap resetado com sucesso!",
      roadmap: roadmap.roadmapData,
    });
  } catch (error) {
    console.error("Erro ao resetar roadmap:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao resetar roadmap",
      error: error.message,
    });
  }
});

export default router;

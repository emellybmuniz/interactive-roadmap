const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');
const { protect } = require('../middleware/auth');

// Todas as rotas aqui são protegidas
router.use(protect);

// @route   GET /api/roadmap
// @desc    Obter roadmap do usuário logado
// @access  Private
router.get('/', async (req, res) => {
    try {
        let roadmap = await Roadmap.findOne({ userId: req.user._id });

        if (!roadmap) {
            roadmap = await Roadmap.create({ userId: req.user._id });
        }

        res.status(200).json({
            success: true,
            roadmap: roadmap.roadmapData
        });
    } catch (error) {
        console.error('Erro ao buscar roadmap:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar roadmap',
            error: error.message
        });
    }
});

// @route   PUT /api/roadmap
// @desc    Atualizar roadmap do usuário
// @access  Private
router.put('/', async (req, res) => {
    try {
        const { roadmapData } = req.body;

        if (!roadmapData) {
            return res.status(400).json({
                success: false,
                message: 'Dados do roadmap são obrigatórios'
            });
        }

        let roadmap = await Roadmap.findOne({ userId: req.user._id });

        if (!roadmap) {
            roadmap = await Roadmap.create({
                userId: req.user._id,
                roadmapData
            });
        } else {
            roadmap.roadmapData = roadmapData;
            await roadmap.save();
        }

        res.status(200).json({
            success: true,
            message: 'Roadmap atualizado com sucesso!',
            roadmap: roadmap.roadmapData
        });
    } catch (error) {
        console.error('Erro ao atualizar roadmap:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar roadmap',
            error: error.message
        });
    }
});

// @route   DELETE /api/roadmap/reset
// @desc    Resetar roadmap para o padrão
// @access  Private
router.delete('/reset', async (req, res) => {
    try {
        let roadmap = await Roadmap.findOne({ userId: req.user._id });

        if (!roadmap) {
            return res.status(404).json({
                success: false,
                message: 'Roadmap não encontrado'
            });
        }

        roadmap.roadmapData = [
            {
                phase: "0",
                title: "Mindset",
                description: "Esta é a fundação invisível. É o que sustenta todo o conhecimento técnico.",
                items: [
                    { text: "Mentalidade Orientada a Problemas", checked: false },
                    { text: "Aprendizado Contínuo", checked: false }
                ]
            },
            {
                phase: "1",
                title: "Fundamentos Universais",
                description: "A base da web.",
                items: [
                    { text: "Git & GitHub", checked: false },
                    {
                        text: "HTTP/HTTPS",
                        checked: false,
                        subItems: [{ text: "DNS", checked: false }]
                    }
                ]
            },
            {
                phase: "2",
                title: "Desenvolvimento Front-End",
                description: "Construindo a interface.",
                items: [
                    { text: "HTML", checked: false },
                    { text: "CSS", checked: false },
                    {
                        text: "JavaScript",
                        checked: false,
                        subItems: [{ text: "Assincronicidade", checked: false }]
                    }
                ]
            }
        ];

        await roadmap.save();

        res.status(200).json({
            success: true,
            message: 'Roadmap resetado com sucesso!',
            roadmap: roadmap.roadmapData
        });
    } catch (error) {
        console.error('Erro ao resetar roadmap:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao resetar roadmap',
            error: error.message
        });
    }
});

module.exports = router;
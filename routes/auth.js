const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Roadmap = require('../models/Roadmap');
const { protect, generateToken } = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Registrar novo usuário
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Por favor, preencha todos os campos'
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Este email já está cadastrado'
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        await Roadmap.create({
            userId: user._id
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao criar usuário',
            error: error.message
        });
    }
});

// @route   POST /api/auth/login
// @desc    Login de usuário
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Por favor, forneça email e senha'
            });
        }

        // Find user by email (with password)
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciais inválidas'
            });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Credenciais inválidas'
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao fazer login',
            error: error.message
        });
    }
});

// @route   GET /api/auth/me
// @desc    Obter dados do usuário logado
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar dados do usuário'
        });
    }
});

// @route   DELETE /api/auth/delete
// @desc    Deletar conta do usuário
// @access  Private
router.delete('/delete', protect, async (req, res) => {
    try {
        await Roadmap.findOneAndDelete({ userId: req.user._id });

        await User.findByIdAndDelete(req.user._id);

        res.status(200).json({
            success: true,
            message: 'Conta deletada com sucesso'
        });
    } catch (error) {
        console.error('Erro ao deletar conta:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar conta'
        });
    }
});

// @route   POST /api/auth/logout
// @desc    Logout do usuário (client-side remove o token)
// @access  Private
router.post('/logout', protect, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso'
    });
});

module.exports = router;
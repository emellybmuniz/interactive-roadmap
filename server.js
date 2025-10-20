const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const app = express();
const port = 3000;


const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 15, 
	message: 'Muitas requisições foram enviadas em um curto espaço de tempo, por favor, tente novamente em um minuto.',
    standardHeaders: true, 
    legacyHeaders: false, 
});

app.use(express.json());
app.use(express.static(__dirname));

if (!process.env.GEMINI_API_KEY) {
    throw new Error('A variável de ambiente GEMINI_API_KEY não está definida.');
} else {
    console.log('Variável de ambiente GEMINI_API_KEY carregada.');
}

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

app.post('/api/gemini', limiter, async (req, res) => { 
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'O prompt é obrigatório' });
        }

        const result = await model.generateContent(prompt);
        const response = result.response;
        res.json({ text: response.text() });
    } catch (error) {
        console.error('Erro ao chamar a API do Gemini:', error);
        res.status(500).json({ error: 'Falha ao chamar a API do Gemini' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Abra http://localhost:${port}/index.html no seu navegador.`);
});

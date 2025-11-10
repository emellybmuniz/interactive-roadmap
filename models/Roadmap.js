const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true 
    },
    roadmapData: {
        type: Array,
        default: [
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
        ]
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update lastModified before saving
roadmapSchema.pre('save', function(next) {
    this.lastModified = new Date();
    next();
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
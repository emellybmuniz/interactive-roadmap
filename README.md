# path4developers - Roadmap Dev
[🇺🇸 English](./README.en.md) | [🇧🇷 Português](./README.md)

![GitHub License](https://img.shields.io/github/license/emellybmuniz/interactive-roadmap)
![GitHub language count](https://img.shields.io/github/languages/count/emellybmuniz/interactive-roadmap)
![GitHub last commit](https://img.shields.io/github/last-commit/emellybmuniz/interactive-roadmap)
![GitHub repo size](https://img.shields.io/github/repo-size/emellybmuniz/interactive-roadmap)
![Project Status](https://img.shields.io/badge/Status%20-%20em%20desenvolvimento%20-%20%23EB3731)
![GitHub Stars](https://img.shields.io/github/stars/emellybmuniz/interactive-roadmap?style=social)

Um roadmap interativo e inteligente que guia profissionais de TI em sua jornada de aprendizado, combinando rastreamento de progresso, persistência de dados e o poder da IA Gemini para explicações e sugestões de projetos personalizados. Tenha controle total do seu plano de estudos, customizando cada passo do seu caminho.

---
### 📋 Índice
- [Visão Geral do Projeto](#-visão-geral-do-projeto)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Destaques & Funcionalidades](#-destaques--funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Configuração](#-configuração)
- [Responsividade](#-responsividade)
- [Validação e Tratamento de Erros](#-validação-e-tratamento-de-erros)
- [API/Funcionalidades Avançadas](#-apifuncionalidades-avançadas)
- [Contribuição](#-contribuição)
- [Melhorias Futuras](#-melhorias-futuras)
- [Licença](#-licença)
- [Autora](#-autora)
---

## 🚀 Visão Geral do Projeto
[![Project Demonstration](src/images/project-demo)](https://emellybmuniz.github.io/interactive-roadmap/)

O **path4developers** nasceu da necessidade de organizar a vasta quantidade de tecnologias que um desenvolvedor profissional de TI precisa dominar. Mais do que uma lista estática, é uma ferramenta interativa que permite:

- **Contexto e Motivação:** Oferecer um caminho claro e estruturado para iniciantes e profissionais que desejam se atualizar.
- **Principais Benefícios:** Rastreamento visual de progresso com gráficos, explicações instantâneas via IA e persistência de dados na nuvem.
- **Público-alvo:** Estudantes de tecnologia, desenvolvedores em transição de carreira e autodidatas.
- **Conceitos Técnicos:** Integração de API de IA (Gemini), autenticação segura (JWT), manipulação avançada de DOM, e arquitetura MVC no backend.


## 📂 Estrutura de Diretórios
```bash
interactive-roadmap/
├── config/
│   └── database.js        # Configuração e conexão com MongoDB Atlas
├── middleware/
│   └── auth.js            # Middleware de proteção de rotas (JWT)
├── models/
│   ├── Roadmap.js         # Schema do Mongoose para dados do roadmap
│   └── User.js            # Schema do usuário com hash de senha
├── routes/
│   ├── auth.js            # Rotas de autenticação (login, registro)
│   └── roadmap.js         # Rotas CRUD para o roadmap do usuário
├── .env                   # Variáveis de ambiente (não versionado)
├── index.html             # Frontend: UI, Lógica, Charts e Integrações
├── server.js              # Entry point: Configuração do Express e APIs
├── package.json           # Dependências e scripts do projeto
├── vercel.json            # Configuração de deploy para Vercel
└── README.md              # Documentação do projeto
```

## ✨ Destaques & Funcionalidades

### 🎯 **Planeje Seu Próprio Caminho**
- **Edição Completa:** O roadmap inicial é apenas um exemplo. Você tem liberdade total para renomear fases, criar novos tópicos e excluir o que não faz sentido para você.
- **Drag & Drop:** Priorize seus estudos arrastando e soltando itens conforme sua necessidade.
- **Integração com IA (Gemini):** A IA se adapta ao seu roadmap. Clique no ícone ✨ em qualquer item customizado para receber explicações contextualizadas.

### 🎨 **Design & Interface Moderna**
- **Modo Escuro/Claro:** Alternância de tema com persistência de preferência do usuário.
- **Visual Clean:** Interface construída com **TailwindCSS**, focada na legibilidade e usabilidade.
- **Feedback Visual:** Gráficos interativos (Chart.js) mostram o progresso geral e por fase em tempo real.

### 📱 **Compatibilidade & Responsividade**
- **Layout Adaptável:** Barra lateral retrátil em dispositivos móveis e redimensionável em desktop.
- **Mobile First:** Interface otimizada para toque e telas menores.
- **Acessibilidade:** Cores contrastantes e navegação intuitiva.

### ✅ **Segurança & Persistência**
- **Autenticação Segura:** Sistema de login e registro com **JWT** e hash de senhas (**bcryptjs**).
- **Persistência em Nuvem:** Seu roadmap personalizado é salvo automaticamente no **MongoDB**, permitindo acesso de qualquer dispositivo.
- **Rate Limiting:** Proteção contra abuso nas rotas de API e autenticação.

## 🛠️ Tecnologias Utilizadas
Este projeto foi construído utilizando as seguintes tecnologias:

![NodeJS](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=express&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-47A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

### Detalhes Técnicos:
- **Backend**: Node.js com Express, estruturado em MVC (Models, Views/Routes, Controllers/Logic).
- **Banco de Dados**: MongoDB Atlas com Mongoose para modelagem de dados flexível (JSON store).
- **Frontend**: HTML5, Vanilla JS e TailwindCSS (via CDN) para agilidade e leveza.
- **IA Generativa**: Google Gemini API para geração dinâmica de conteúdo educacional.

## ⚙️ Pré-requisitos
Para executar este projeto localmente, você precisará de:

**Ambiente e Chaves:**
- Node.js v14+ instalado.
- Uma conta no [MongoDB Atlas](https://www.mongodb.com/) (ou MongoDB local).
- Uma chave de API do [Google Gemini](https://ai.google.dev/).

## 📦 Instalação
```bash
# 1. Clone este repositório
$ git clone https://github.com/emellybmuniz/interactive-roadmap.git

# 2. Navegue até o diretório do projeto
$ cd interactive-roadmap

# 3. Instale as dependências
$ npm install

# 4. Configure as variáveis de ambiente (veja seção Configuração)
# Crie um arquivo .env na raiz

# 5. Inicie o servidor de desenvolvimento
$ npm run dev
```
**Alternativa:** Acesse a versão online em [path4developers.vercel.app](https://path4developers.vercel.app/)

## 💡 Como Usar
1.  **Crie uma Conta:** Registre-se para salvar seu roadmap personalizado na nuvem.
2.  **Personalize:** Use os botões de editar (✏️) e excluir (🗑️) para moldar o roadmap aos seus objetivos de carreira. Adicione novas fases e tópicos.
3.  **Marque seu Progresso:** Clique nos checkboxes conforme domina cada tecnologia.
4.  **Aprenda com IA:** Clique no ícone ✨ ao lado de qualquer item (mesmo os que você criou) para uma explicação rápida.
5.  **Pratique:** Clique no botão "Projeto" em cada fase para receber uma sugestão de desafio prático da IA.

## ⚙️ Configuração
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

### Configurações Necessárias:
```properties
MONGODB_URI=sua_string_de_conexao_mongodb
GEMINI_API_KEY=sua_chave_api_google_gemini
JWT_SECRET=sua_chave_secreta_jwt
SESSION_SECRET=sua_chave_secreta_sessao
PORT=3000
```

## 📱 Responsividade
### Desktop (> 768px)
- Barra lateral fixa com redimensionamento manual (drag).
- Visualização completa dos gráficos e detalhes.

### Mobile (≤ 768px)
- Menu "hambúrguer" para acessar a barra lateral.
- Layout de coluna única para melhor leitura.
- Modais adaptados para telas cheias ou parciais.

## 🛡️ Validação e Tratamento de Erros
### Validações Implementadas:
- **Backend:** Validação de campos obrigatórios (nome, email, senha) no Mongoose e unicidade de email.
- **Frontend:** Feedback visual em formulários e proteção de rotas na UI.

### Tratamento de Erros:
- Mensagens amigáveis via alertas ou modais em caso de falha de login ou registro.
- Logs de erro no console do servidor para depuração.
- Fallback gracioso caso a API do Gemini falhe.

## 🔌 API/Funcionalidades Avançadas
### Endpoints Principais:
| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|--------|
| POST | `/api/auth/register` | Cria novo usuário e retorna token | Público |
| POST | `/api/auth/login` | Autentica usuário e retorna token | Público |
| GET | `/api/roadmap` | Obtém o roadmap personalizado do usuário | Privado (JWT) |
| PUT | `/api/roadmap` | Salva alterações no roadmap (estrutura e progresso) | Privado (JWT) |
| POST | `/api/gemini` | Envia prompt para IA e retorna texto | Limitado |

## 🤝 Contribuição
Contribuições são sempre bem-vindas e **muito apreciadas!** Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

### Como contribuir:
1. **Fork** este repositório
2. **Clone** seu fork: `git clone https://github.com/seu-usuario/interactive-roadmap.git`
3. **Crie uma branch**: `git checkout -b feature/nova-funcionalidade`
4. **Faça suas alterações** e teste completamente
5. **Commit**: `git commit -m 'Adiciona nova funcionalidade'`
6. **Push**: `git push origin feature/nova-funcionalidade`
7. **Abra um Pull Request**

## 🚀 Melhorias Futuras
### Próximas Funcionalidades:
- [ ] **Recuperação de Senha**
- [ ] **Gerar projetos com IA baseado nos itens completos do roadmap**
- [ ] **Sugerir projeto considerando todo o progresso concluído em todas as fases**

## 🔑 Licença
Este projeto está licenciado sob a **Licença GNU Lesser General Public License v2.1* - consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.

## ✍️ Autora
Desenvolvido por **Emelly Beatriz** com ❤️

📬 Entre em contato:
📧 emellybmuniz@gmail.com |
💼 [Linkedin](https://www.linkedin.com/in/emellybmuniz) |
🐙 [Github](https://github.com/emellybmuniz)

---
⭐ **Gostou do projeto?** Deixe uma estrela no repositório para apoiar o desenvolvimento!


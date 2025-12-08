import { Schema, model } from "mongoose";

const roadmapSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    roadmapData: {
      type: Array,
      default: [
        {
          phase: "0",
          title: "Fundamentos",
          description: "Base do conhecimento técnico.",
          items: [
            { text: "Mentalidade Orientada a Problemas", checked: true },
            {
              text: "Git & GitHub: Fundamentos de versionamento de código.",
              checked: true,
            },
            { text: "Linha de Comando (CLI)", checked: true },
            { text: "HTTP/HTTPS", checked: true },
            { text: "JSON", checked: true },
            { text: "Cloud: Conceitos básicos", checked: false },
            { text: "SQL: Fundamentos de bancos de dados", checked: false },
            {
              text: "Gerenciamento de Pacotes",
              checked: false,
              subItems: [
                { text: "npm / Yarn", checked: true },
                { text: "venv (Python)", checked: false },
                { text: "Maven / Gradle (Java)", checked: false },
              ],
            },
          ],
        },
        {
          phase: "1",
          title: "Desenvolvimento Front-End",
          description: "Construindo a interface visual.",
          items: [
            { text: "HTML", checked: true },
            { text: "CSS", checked: true },
            { text: "JavaScript: Fundamentos", checked: true },
            { text: "Manipulação do DOM", checked: true },
            { text: "Assincronicidade", checked: false },
            { text: "TypeScript", checked: false },
            {
              text: "Frameworks",
              checked: false,
              subItems: [
                { text: "React.js", checked: false },
                { text: "Next.js", checked: false },
              ],
            },
            {
              text: "Ferramentas de Build",
              checked: false,
              subItems: [
                { text: "Webpack", checked: false },
                { text: "Vite", checked: false },
              ],
            },
          ],
        },
        {
          phase: "2",
          title: "Desenvolvimento Back-End",
          description: "Criando a lógica do servidor.",
          items: [
            { text: "Node.js", checked: false },
            { text: "Express.js", checked: false },
            { text: "APIs: REST e GraphQL", checked: false },
            { text: "Autenticação", checked: false },
            { text: "Banco de Dados", checked: false },
            {
              text: "NoSQL",
              checked: false,
              subItems: [
                { text: "MongoDB", checked: true },
                { text: "Mongoose", checked: false },
              ],
            },
          ],
        },
        {
          phase: "3",
          title: "Testes e Qualidade",
          description: "Garantindo a funcionalidade do código.",
          items: [
            { text: "Jest", checked: false },
            { text: "Cypress", checked: false },
            { text: "ESLint", checked: true },
            { text: "Prettier", checked: true },
          ],
        },
        {
          phase: "4",
          title: "Infraestrutura e DevOps",
          description: "Implantando e gerenciando aplicações.",
          items: [
            { text: "Docker", checked: false },
            { text: "Kubernetes", checked: false },
            { text: "CI/CD", checked: false },
            { text: "AWS", checked: true },
            { text: "Azure", checked: false },
          ],
        },
      ],
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

roadmapSchema.pre("save", function (next) {
  this.lastModified = new Date();
  next();
});

export default model("Roadmap", roadmapSchema);

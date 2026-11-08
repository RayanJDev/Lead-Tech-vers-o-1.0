<div align="center">

# 🎯 Captação de Clientes

### Mini CRM para captar e acompanhar leads de uma academia de várias modalidades

![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

**Do primeiro contato à matrícula: nenhum lead fica pra trás.** 💪

</div>

---

## 📱 Sobre o projeto

Academias vivem de novos alunos, e muitos interessados se perdem por falta de acompanhamento. O **Captação de Clientes** é um app mobile simples e rápido que organiza todos os seus leads em um só lugar, mostra em que etapa cada um está e permite entrar em contato com apenas um toque.

Tudo funciona **offline**, com os dados salvos no próprio celular usando SQLite.

## ✨ Funcionalidades

| | Recurso | Descrição |
|---|---|---|
| ➕ | **Cadastro completo** | Cadastre, edite e exclua clientes com nome, telefone, e-mail, empresa, origem e observações |
| 🔎 | **Busca inteligente** | Encontre leads por nome ou modalidade esportiva |
| 🏷️ | **Filtro por status** | Veja só quem está em cada etapa do funil |
| 📊 | **Funil de vendas** | Acompanhe cada lead: `Novo` → `Em contato` → `Convertido` ou `Perdido` |
| 📞 | **Ligação direta** | Ligue para o lead sem sair do app |
| 💬 | **WhatsApp direto** | Abra a conversa com um toque |

## 🔄 O funil

```
🆕 Novo  ──►  📞 Em contato  ──►  ✅ Convertido
                    │
                    └──────────►  ❌ Perdido
```

## 🛠️ Tecnologias

- **[Expo](https://expo.dev/)** e **React Native**: desenvolvimento mobile multiplataforma
- **[Expo Router](https://docs.expo.dev/router/introduction/)**: navegação baseada em arquivos
- **TypeScript**: código mais seguro e organizado
- **[expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)**: banco de dados local

## 🚀 Como rodar

**Pré-requisitos:** [Node.js](https://nodejs.org/) instalado e o app **Expo Go** no celular (ou um emulador Android/iOS).

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# 2. Entre na pasta do projeto
cd SEU-REPOSITORIO/captacao

# 3. Instale as dependências
npm install

# 4. Inicie o projeto
npx expo start
```

Depois é só escanear o **QR Code** com o Expo Go e pronto! 🎉

## 📂 Estrutura do projeto

```
captacao/
├── app/            # Telas e rotas (lista, novo, editar, detalhe)
├── components/     # Componentes reutilizáveis (FormCliente, Dropdown)
├── constants/      # Cores e constantes do app
├── database/       # Conexão, migrações e consultas do SQLite
├── types/          # Tipos do TypeScript
├── utils/          # Funções auxiliares
└── assets/         # Imagens e fontes
```

## 🗺️ Próximos passos

- [ ] Dashboard com taxa de conversão
- [ ] Lembretes de retorno para leads em contato
- [ ] Exportar lista de clientes
- [ ] Backup na nuvem

## 👨‍💻 Autor

Feito por **Rayan**.

<div align="center">

⭐ Se gostou do projeto, deixe uma estrela no repositório!

</div>

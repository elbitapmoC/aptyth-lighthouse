# 🌟 Aptyth Lighthouse - Modern Bible Study Platform

Aptyth Lighthouse is a next-generation Bible study platform that combines cutting-edge technology with timeless scripture, creating an engaging and transformative experience for believers worldwide.

## 🎯 Vision

To set the gold standard for Bible study platforms—providing tools for individuals to *explore* scripture, *discover* its historical context, and *connect* with its timeless truths in a personalized and meaningful way.

## ✨ Features

### Core Features
- 📖 Advanced Bible Reader with multiple translations
- 🔍 Intelligent search with historical context
- 📝 Personal study tools and note-taking
- 🎯 Progress tracking and habit formation
- 🌍 Multi-language support
- 🌙 Dark/Light theme

### AI-Enhanced Study
- 🤖 AI-suggested thematic guides
- 📚 Historical and cultural insights
- 🔄 Cross-reference discovery
- ❓ Dynamic Q&A with scriptural grounding

### Community & Engagement
- 👥 Interactive study groups
- 🙏 Live prayer rooms
- 💎 Faith Gems rewards system
- 🏆 Reading challenges and achievements

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- pnpm 8.x or higher
- Deno 1.x or higher
- Git

### Environment Setup
1. **API Keys and Secrets**
   ```bash
   # Required API keys
   TYPESENSE_API_KEY=your_api_key
   GOOGLE_AI_API_KEY=your_api_key
   SUPERTOKENS_API_KEY=your_api_key
   
   # Database configuration
   DATABASE_URL=your_neon_db_url
   
   # Optional services
   SENTRY_DSN=your_sentry_dsn
   ```

2. **Development Tools**
   ```bash
   # Install global dependencies
   npm install -g pnpm
   
   # Install recommended VS Code extensions
   code --install-extension dbaeumer.vscode-eslint
   code --install-extension bradlc.vscode-tailwindcss
   code --install-extension esbenp.prettier-vscode
   ```

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/elbitapmoc/aptyth-lighthouse.git
cd aptyth-lighthouse

# Install dependencies
cd frontend
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
pnpm dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Cache dependencies
deno cache deps.ts

# Set up environment variables
cp .env.example .env

# Start Deno development server
deno task dev
```

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand + TanStack Query
- **Internationalization**: next-i18next
- **PWA Support**: Serwist

### Backend
- **Runtime**: Deno
- **Database**: Neon (PostgreSQL)
- **Search**: Typesense
- **Authentication**: SuperTokens
- **API**: Hono
- **AI Integration**: RAG with Gemini

### Development Tools
- **Package Manager**: pnpm
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Testing**: Vitest, Playwright
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry

## 📚 Documentation

- [Architecture Overview](docs/architecture.md)
- [API Documentation](docs/api.md)
- [Contributing Guide](docs/contributing.md)
- [Security Policy](SECURITY.md)
- [Development Guidelines](docs/development.md)
- [Testing Strategy](docs/testing.md)

## 🔧 Development Commands

```bash
# Frontend Commands
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm start         # Start production server
pnpm test          # Run tests
pnpm lint          # Lint code
pnpm format        # Format code

# Backend Commands
deno task dev      # Start development server
deno task test     # Run tests
deno task lint     # Lint code
deno task format   # Format code
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/contributing.md) for details.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🔒 Security

- All API endpoints are protected with JWT authentication
- Data is encrypted at rest and in transit
- Regular security audits are performed
- Vulnerability reporting process is documented in [SECURITY.md](SECURITY.md)

## 📈 Project Status

- **Current Version**: 0.1.0
- **Stage**: Early Development
- **Next Milestone**: Beta Release (Q2 2024)
- [View Roadmap](docs/roadmap.md)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bible text provided by [Source]
- Archaeological data from [Source]
- Icons by [Lucide](https://lucide.dev)
- UI components by [shadcn/ui](https://ui.shadcn.com)
- Community contributors

## 📬 Contact & Support

- **Website**: [Your Website]
- **Documentation**: [Docs Website]
- **Email**: [Your Email]
- **Twitter**: [@YourHandle]
- **Discord**: [Join our community]
- **Bug Reports**: [GitHub Issues]

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=elbitapmoc/aptyth-lighthouse&type=Date)](https://star-history.com/#elbitapmoc/aptyth-lighthouse&Date)

---

Built with ❤️ for the global Christian community
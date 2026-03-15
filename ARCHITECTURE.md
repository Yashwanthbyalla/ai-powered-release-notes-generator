# Project Summary - Release Notes Generator

## Overview
Full-stack application for generating intelligent release notes from Git repositories with AI-powered categorization and Azure DevOps integration.

## Architecture

### Frontend (Angular 21)
- **Framework**: Angular 21 with Standalone Components
- **Styling**: SCSS with responsive design
- **HTTP Client**: Angular HttpClient for API communication
- **Forms**: Template-driven forms with two-way binding

**Key Components**:
- `AppComponent`: Main UI with form and results display
- `ApiService`: Backend communication service
- `Models`: TypeScript interfaces for type safety

### Backend (Node.js + Express)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Git Operations**: simple-git library
- **ADO Integration**: azure-devops-node-api
- **AI Integration**: Ollama REST API

**Key Services**:
- `GitService`: Git repository operations (commits, tags, branches)
- `AdoService`: Azure DevOps API integration
- `OllamaService`: AI/LLM integration for categorization
- `ReleaseNotesService`: Orchestrates all operations

### AI Layer (Ollama)
- **Model**: Llama 3.2 (default, configurable)
- **Deployment**: Local (runs on user's machine)
- **Privacy**: All data stays local, no cloud API calls
- **Features**:
  - Commit categorization (feature/fix/breaking/other)
  - Summary generation
  - Breaking change detection

## Data Flow

```
User Input (Angular)
    ↓
API Request (HTTP)
    ↓
Express Routes
    ↓
ReleaseNotesService
    ↓
┌─────────────┬──────────────┬─────────────┐
│             │              │             │
GitService    AdoService    OllamaService
│             │              │             │
Git Repo      Azure DevOps  Ollama API
└─────────────┴──────────────┴─────────────┘
    ↓
Release Notes Object
    ↓
JSON Response
    ↓
Angular Display + Download
```

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/generate` | Generate release notes |
| GET | `/api/git/tags` | Get repository tags |
| GET | `/api/git/branches` | Get repository branches |
| GET | `/api/ado/pipelines` | Get ADO pipelines |
| GET | `/api/ollama/status` | Check Ollama connection |
| GET | `/health` | Health check |

## Generation Methods

### 1. All Commits
- Retrieves entire repository history
- Best for: Initial documentation, complete changelog

### 2. Date Range
- Filters commits between dates
- Best for: Monthly/quarterly releases, sprint notes

### 3. Tag Range
- Compares between Git tags
- Best for: Version releases (v1.0.0 → v2.0.0)

### 4. Branch Compare
- Shows differences between branches
- Best for: Feature branch reviews, merge previews

### 5. Last N Commits
- Gets recent N commits
- Best for: Quick updates, hotfix documentation

### 6. Pipeline Range
- Extracts commits between ADO pipeline runs
- Best for: Production deployment notes

## AI Features

### Auto-Categorization
Uses pattern matching + AI to categorize commits:
- **Features**: New functionality (feat:, feature:)
- **Fixes**: Bug fixes (fix:, bug:)
- **Breaking**: Breaking changes (BREAKING:, !:)
- **Other**: Chores, docs, refactoring

### Summary Generation
- Analyzes all commit messages
- Generates 2-3 sentence executive summary
- Highlights key changes and impact

### Breaking Change Detection
- Identifies potentially breaking changes
- Checks commit messages and patterns
- Flags for review before release

## Technology Choices

### Why Angular 21?
- Latest version with standalone components
- Strong TypeScript support
- Excellent form handling
- Built-in HTTP client

### Why Node.js + Express?
- JavaScript/TypeScript full-stack consistency
- Rich ecosystem (simple-git, azure-devops-node-api)
- Easy to deploy and maintain
- Fast development

### Why Ollama?
- **Free**: No API costs
- **Private**: Data never leaves user's machine
- **Powerful**: Modern LLMs (Llama 3.2, Mistral)
- **Flexible**: Easy to switch models
- **Offline**: Works without internet

### Why simple-git?
- Pure JavaScript Git implementation
- No Git CLI dependencies
- Promise-based API
- Well-maintained

## Security Considerations

### Data Privacy
- All Git operations are read-only
- No data sent to external services (except ADO if configured)
- Ollama runs locally
- ADO tokens never stored

### Input Validation
- Repository path validation
- Date format validation
- API error handling
- Timeout protection

### Dependencies
- Regular updates via npm
- No known vulnerabilities
- Minimal dependency tree

## Performance

### Optimization Strategies
- Lazy loading of tags/branches
- Commit pagination for large repos
- AI categorization with timeout fallback
- Caching of Git operations

### Scalability
- Handles repositories with 10,000+ commits
- Concurrent request support
- Efficient memory usage
- Stream-based processing for large outputs

## Deployment Options

### Option 1: Local Development
```bash
npm run dev
```
- Frontend: localhost:4200
- Backend: localhost:3000

### Option 2: Production Build
```bash
npm run build
npm run build:backend
```
- Serve frontend static files
- Run backend with PM2 or similar

### Option 3: Docker (Future)
```dockerfile
# Multi-stage build
# Frontend + Backend in single container
```

### Option 4: Electron App (Future)
- Package as desktop application
- Bundle Node.js runtime
- No server needed

## File Structure

```
generate-release-notes/
├── backend/                    # Node.js backend
│   ├── src/
│   │   ├── services/          # Business logic
│   │   ├── routes/            # API routes
│   │   ├── types/             # TypeScript types
│   │   └── server.ts          # Express app
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                   # Configuration
├── frontend/                   # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/        # Data models
│   │   │   ├── services/      # API services
│   │   │   ├── app.component.* # Main component
│   │   │   └── app.config.ts  # App configuration
│   │   ├── main.ts            # Bootstrap
│   │   ├── index.html         # HTML shell
│   │   └── styles.scss        # Global styles
│   ├── angular.json           # Angular config
│   ├── package.json
│   └── tsconfig.json
├── package.json               # Root package
├── README.md                  # Main documentation
├── QUICKSTART.md              # Quick start guide
├── EXAMPLES.md                # Usage examples
├── setup.bat                  # Windows setup
└── start.bat                  # Windows start script
```

## Future Enhancements

### Phase 2
- [ ] GitHub/GitLab integration
- [ ] JIRA ticket linking
- [ ] Custom templates
- [ ] PDF export

### Phase 3
- [ ] Multi-repository support
- [ ] Scheduled generation
- [ ] Email notifications
- [ ] Slack/Teams integration

### Phase 4
- [ ] Web-based deployment
- [ ] User authentication
- [ ] Team collaboration
- [ ] Analytics dashboard

## Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint for linting
- Prettier for formatting
- Conventional commits

### Testing (Future)
- Jest for backend unit tests
- Jasmine/Karma for Angular tests
- E2E tests with Playwright
- API tests with Supertest

### Git Workflow
- Feature branches
- Pull request reviews
- Semantic versioning
- Automated releases

## Troubleshooting

### Common Issues

**Ollama not connecting**
- Solution: Start Ollama service, pull model

**Git operations failing**
- Solution: Verify repo path, check Git installation

**ADO authentication errors**
- Solution: Verify PAT permissions, check org URL

**Port conflicts**
- Solution: Change ports in .env and angular.json

## Resources

### Documentation
- [Angular Docs](https://angular.dev)
- [Express.js Guide](https://expressjs.com)
- [Ollama Documentation](https://ollama.ai/docs)
- [simple-git API](https://github.com/steveukx/git-js)

### Tools
- [Ollama](https://ollama.ai)
- [Node.js](https://nodejs.org)
- [Angular CLI](https://angular.dev/tools/cli)
- [VS Code](https://code.visualstudio.com)

## License
MIT License - Free for personal and commercial use

## Support
- GitHub Issues
- Documentation
- Community Discord (future)

---

**Built with**: Angular 21, Node.js, Express, TypeScript, Ollama
**Author**: Release Notes Generator Team
**Version**: 1.0.0

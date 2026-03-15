# 🚀 AI-Powered Release Notes Generator

A modern, full-stack application for generating intelligent release notes from Git repositories with Azure DevOps integration and AI-powered categorization using Ollama.

## ✨ Features

### Generation Methods
- **All Commits**: Generate notes from entire repository history
- **Date Range**: Filter commits between specific dates
- **Tag Range**: Compare between Git tags (e.g., v1.0.0 to v2.0.0)
- **Branch Compare**: Compare commits between branches
- **Last N Commits**: Generate from recent commits
- **Pipeline Range**: Azure DevOps pipeline-based generation

### AI Features (Powered by Ollama)
- 🤖 **Auto-categorization**: Automatically categorize commits into Features, Fixes, Breaking Changes, and Other
- 📝 **Smart Summaries**: Generate executive summaries of changes
- ⚠️ **Breaking Change Detection**: Identify potentially breaking changes

### Output
- Beautiful web interface with categorized view
- Download as Markdown (CHANGELOG.md)
- Contributor statistics
- Commit metadata (hash, author, date)

## 🛠️ Tech Stack

- **Frontend**: Angular 21 (Standalone Components)
- **Backend**: Node.js + Express + TypeScript
- **Git Operations**: simple-git
- **ADO Integration**: azure-devops-node-api
- **AI**: Ollama (Local LLM - Free & Private)

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **Git** installed and accessible from command line
3. **Ollama** (for AI features)
   - Download: https://ollama.ai
   - Install model: `ollama pull llama3.2`

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd generate-release-notes
```

### 2. Install dependencies
```bash
npm run install:all
```

This will install dependencies for root, backend, and frontend.

### 3. Configure Backend

Edit `backend/.env` if needed:
```env
PORT=3000
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

### 4. Start Ollama (for AI features)
```bash
# Install Ollama from https://ollama.ai
# Then pull a model
ollama pull llama3.2

# Start Ollama (usually runs automatically)
ollama serve
```

## 🎯 Usage

### Start the Application

**Option 1: Run both frontend and backend together**
```bash
npm run dev
```

**Option 2: Run separately**
```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend
npm run frontend
```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000

### Using the Application

1. **Enter Repository Path**: Provide the full path to your Git repository
   - Example: `C:\Users\username\projects\my-repo`

2. **Select Generation Method**:
   - **All Commits**: No additional configuration needed
   - **Date Range**: Select start and end dates
   - **Tag Range**: Select from available tags
   - **Branch Compare**: Choose base and compare branches
   - **Last N Commits**: Enter number of commits
   - **Pipeline Range**: Configure ADO settings

3. **Enable AI Features** (Optional):
   - Ensure Ollama is running
   - Check "Enable AI Features"
   - Select desired AI enhancements:
     - Auto-categorize commits
     - Generate summary
     - Detect breaking changes

4. **Generate**: Click "Generate Release Notes"

5. **Download**: Click "Download Markdown" to save as CHANGELOG.md

## 🔧 Azure DevOps Integration

To use Pipeline Range generation:

1. Create a Personal Access Token (PAT) in Azure DevOps:
   - Go to User Settings → Personal Access Tokens
   - Create new token with `Build (Read)` and `Code (Read)` permissions

2. In the application:
   - Enter your ADO Organization URL (e.g., `https://dev.azure.com/yourorg`)
   - Enter your PAT
   - Enter Project Name
   - Select pipeline range

## 📁 Project Structure

```
generate-release-notes/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   ├── git.service.ts          # Git operations
│   │   │   ├── ado.service.ts          # Azure DevOps integration
│   │   │   ├── ollama.service.ts       # AI/LLM integration
│   │   │   └── release-notes.service.ts # Core logic
│   │   ├── routes/
│   │   │   └── api.routes.ts           # API endpoints
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript interfaces
│   │   └── server.ts                   # Express server
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/
│   │   │   │   └── release-notes.model.ts
│   │   │   ├── services/
│   │   │   │   └── api.service.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   ├── app.component.scss
│   │   │   └── app.config.ts
│   │   ├── main.ts
│   │   ├── index.html
│   │   └── styles.scss
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
└── package.json
```

## 🔌 API Endpoints

### POST `/api/generate`
Generate release notes
```json
{
  "source": "date-range",
  "repoPath": "C:\\path\\to\\repo",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "enableAI": true,
  "aiFeatures": {
    "categorize": true,
    "summarize": true,
    "detectBreaking": true
  }
}
```

### GET `/api/git/tags?repoPath=<path>`
Get all tags from repository

### GET `/api/git/branches?repoPath=<path>`
Get all branches from repository

### GET `/api/ado/pipelines?project=<name>&orgUrl=<url>`
Get pipelines from Azure DevOps (requires `x-ado-token` header)

### GET `/api/ollama/status`
Check Ollama connection status

## 🤖 Ollama Models

Recommended models:
- **llama3.2** (Default, 2GB) - Fast and efficient
- **mistral** (4GB) - Good balance
- **llama3.1** (4.7GB) - More accurate

Change model in backend `.env`:
```env
OLLAMA_MODEL=mistral
```

## 🐛 Troubleshooting

### Ollama not connecting
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Start Ollama
ollama serve
```

### Git operations failing
- Ensure Git is installed: `git --version`
- Verify repository path is correct
- Check repository has commits

### ADO integration issues
- Verify PAT has correct permissions
- Check organization URL format
- Ensure project name is exact match

## 📝 Example Output

```markdown
# Commits from 2024-01-01 to 2024-12-31

**Date Range:** 1/1/2024 - 12/31/2024

## Summary
This release includes 15 new features, 8 bug fixes, and performance improvements across the application.

## 🚨 Breaking Changes
- abc1234 - Removed deprecated API endpoints (John Doe)

## ✨ Features
- def5678 - Add user authentication (Jane Smith)
- ghi9012 - Implement dark mode (Bob Johnson)

## 🐛 Bug Fixes
- jkl3456 - Fix memory leak in data processing (Alice Brown)

## 👥 Contributors
- John Doe (25 commits)
- Jane Smith (18 commits)
- Bob Johnson (12 commits)
```

## 🔒 Privacy & Security

- All processing happens locally
- Ollama runs on your machine (no data sent to cloud)
- ADO tokens are never stored
- Git operations are read-only

## 🚀 Future Enhancements

- [ ] JIRA integration
- [ ] GitHub/GitLab support
- [ ] Custom templates
- [ ] Email notifications
- [ ] Scheduled generation
- [ ] Multi-repository support
- [ ] PDF export

## 📄 License

MIT License - Copyright (c) 2024 Yashwanth Byalla

See [LICENSE](LICENSE) file for details.

## 👤 Author

**Yashwanth Byalla**
- GitHub: [@yashwanthbyalla](https://github.com/yashwanthbyalla)
- Project: [AI-Powered Release Notes Generator](https://github.com/yashwanthbyalla/ai-powered-release-notes-generator)

## 🤝 Contributing

Contributions are welcome! By contributing, you agree to license your contributions under the same MIT License.

See [CONTRIBUTORS.md](CONTRIBUTORS.md) for the list of contributors.

## 💡 Tips

1. Use conventional commits (feat:, fix:, etc.) for better AI categorization
2. Keep Ollama running in background for instant AI features
3. Create Git tags for version-based release notes
4. Use branch compare for feature branch summaries

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review API documentation
3. Open a GitHub issue

---

© 2024 Yashwanth Byalla. All rights reserved.

Built with ❤️ using Angular 21, Node.js, and Ollama

# 🚀 AI-Powered Release Notes Generator

> Automate your release documentation with the power of local AI — no cloud, no cost, no compromise on privacy.

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat&logo=angular)](https://angular.io)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Ollama](https://img.shields.io/badge/Ollama-LLM-black?style=flat)](https://ollama.ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red)](https://github.com/yashwanthbyalla/ai-powered-release-notes-generator)

---

## 📌 What is this?

**AI-Powered Release Notes Generator** is a full-stack developer tool that eliminates the manual effort of writing release notes. It connects directly to your Git repository, extracts commit history, and uses a **locally running LLM (Ollama)** to generate structured, professional release notes — categorized, summarized, and ready to ship.

Whether you're a solo developer or part of a large team, this tool saves hours of documentation work every release cycle.

---

## ✨ Features

### 🔀 Flexible Commit Sourcing
| Method | Description |
|---|---|
| All Commits | Full repository history |
| Date Range | Filter between specific dates |
| Tag Range | Compare Git tags (e.g. v1.0.0 → v2.0.0) |
| Branch Compare | Diff between any two branches |
| Last N Commits | Most recent N commits |
| Pipeline Range | Azure DevOps pipeline-based generation |

### 🤖 AI Features (Powered by Ollama — 100% Local)
- **Auto-categorization** — Classifies commits into Features, Bug Fixes, Breaking Changes, and Other
- **Detailed AI Summary** — Generates a structured release summary with Overview, Key Highlights, Bug Fixes, Technical Changes, and Impact sections
- **Breaking Change Detection** — Flags potentially breaking changes automatically

### 📤 Output
- Clean, categorized web UI with accordion sections
- One-click **Download as Markdown** (CHANGELOG.md)
- Contributor statistics with commit counts
- Full commit metadata (hash, author, date, description)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21 (Standalone Components) |
| Backend | Node.js + Express + TypeScript |
| Git Operations | simple-git |
| ADO Integration | azure-devops-node-api |
| AI / LLM | Ollama (llama3.2 / mistral / llama3.1) |

---

## 📋 Prerequisites

1. **Node.js** v18 or higher
2. **Git** installed and accessible from terminal
3. **Ollama** for AI features
   - Download: https://ollama.ai
   - Pull a model: `ollama pull llama3.2`

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yashwanthbyalla/ai-powered-release-notes-generator.git
cd generate-release-notes
```

### 2. Install all dependencies
```bash
npm run install:all
```

### 3. Configure backend (optional)
Edit `backend/.env`:
```env
PORT=3000
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

### 4. Start Ollama
```bash
ollama pull llama3.2
ollama serve
```

---

## 🎯 Usage

### Start the application
```bash
# Run frontend + backend together
npm run dev
```

Or separately:
```bash
# Terminal 1
npm run backend

# Terminal 2
npm run frontend
```

| Service | URL |
|---|---|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:3000 |

### Step-by-step

1. **Enter Repository Path** — e.g. `C:\Users\username\projects\my-repo`
2. **Select Generation Method** — choose from the 6 available strategies
3. **Enable AI Features** — check "Enable AI Summary" and optionally "Auto-categorize" and "Detect breaking changes"
4. **Generate** — click "Generate Release Notes"
5. **Download** — export as `CHANGELOG.md`

---

## 🔧 Azure DevOps Integration

1. Create a PAT in Azure DevOps:
   - User Settings → Personal Access Tokens
   - Permissions: `Build (Read)` + `Code (Read)`

2. In the app:
   - Enter ADO Organization URL (e.g. `https://dev.azure.com/yourorg`)
   - Enter your PAT
   - Enter Project Name
   - Select pipeline range

---

## 📁 Project Structure

```
generate-release-notes/
├── backend/
│   └── src/
│       ├── services/
│       │   ├── git.service.ts            # Git operations via simple-git
│       │   ├── ado.service.ts            # Azure DevOps API integration
│       │   ├── ollama.service.ts         # LLM prompt engineering & AI calls
│       │   └── release-notes.service.ts  # Core orchestration logic
│       ├── routes/
│       │   └── api.routes.ts             # REST API endpoints
│       ├── types/
│       │   └── index.ts                  # Shared TypeScript interfaces
│       └── server.ts                     # Express server entry point
├── frontend/
│   └── src/app/
│       ├── models/
│       │   └── release-notes.model.ts    # Frontend data models
│       ├── services/
│       │   └── api.service.ts            # HTTP client service
│       ├── app.component.ts              # Main component logic
│       ├── app.component.html            # UI template
│       └── app.component.scss            # Styles
└── package.json
```

---

## 🔌 API Reference

### `POST /api/generate`
Generate release notes.
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

### `GET /api/git/tags?repoPath=<path>`
Returns all Git tags from the repository.

### `GET /api/git/branches?repoPath=<path>`
Returns all branches from the repository.

### `GET /api/ado/pipelines?project=<name>&orgUrl=<url>`
Returns Azure DevOps pipelines. Requires `x-ado-token` header.

### `GET /api/ollama/status`
Returns Ollama connection status.

---

## 🤖 Supported Ollama Models

| Model | Size | Notes |
|---|---|---|
| llama3.2 | 2GB | Default — fast and efficient |
| mistral | 4GB | Good balance of speed and quality |
| llama3.1 | 4.7GB | Most accurate |

Change model in `backend/.env`:
```env
OLLAMA_MODEL=mistral
```

---

## 📝 Example Output

```markdown
# Commits from 2024-01-01 to 2024-12-31

**Release Overview:**
This release delivers significant improvements across authentication, performance, and developer experience...

**Key Highlights:**
• Add user authentication — Implements JWT-based login and session management...
• Implement dark mode — Adds system-aware theme switching with user preference persistence...

**Bug Fixes & Improvements:**
• Fix memory leak in data processing — Resolved an issue where large datasets caused...

**Technical Changes:**
• Upgraded Angular to v21 standalone component architecture...

## 🚨 Breaking Changes
- abc1234 - Removed deprecated API endpoints (John Doe)

## ✨ Features
- def5678 - Add user authentication (Jane Smith)

## 🐛 Bug Fixes
- jkl3456 - Fix memory leak in data processing (Alice Brown)

## 👥 Contributors
- John Doe (25 commits)
- Jane Smith (18 commits)
```

---

## 🔒 Privacy & Security

- ✅ All processing happens **locally on your machine**
- ✅ Ollama runs locally — **no data sent to any cloud**
- ✅ ADO tokens are **never stored**
- ✅ Git operations are **read-only**

---

## 🚀 Roadmap

- [ ] GitHub & GitLab support
- [ ] JIRA ticket linking
- [ ] Custom summary templates
- [ ] PDF export
- [ ] Scheduled generation
- [ ] Multi-repository support
- [ ] Email notifications
- [ ] Docker support

---

## 💡 Tips for Best Results

1. Use **conventional commits** (`feat:`, `fix:`, `chore:`) for accurate AI categorization
2. Add **commit descriptions** (not just titles) for richer AI summaries
3. Keep **Ollama running in the background** for instant results
4. Use **Git tags** for clean version-based release notes
5. Use **branch compare** for feature branch summaries before merging

---

## 🐛 Troubleshooting

### Ollama not connecting
```bash
curl http://localhost:11434/api/tags
ollama serve
```

### Git operations failing
- Verify Git is installed: `git --version`
- Check the repository path is correct and has commits

### ADO integration issues
- Verify PAT permissions (`Build (Read)` + `Code (Read)`)
- Check organization URL format: `https://dev.azure.com/yourorg`
- Ensure project name is an exact match

---

## 📄 License

MIT License — Copyright (c) 2024 Yashwanth Byalla. See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Yashwanth Byalla**
- GitHub: [@yashwanthbyalla](https://github.com/yashwanthbyalla)
- Project: [AI-Powered Release Notes Generator](https://github.com/yashwanthbyalla/ai-powered-release-notes-generator)

---

## 🤝 Contributing

Contributions are welcome! By contributing, you agree to license your contributions under the same MIT License.

See [CONTRIBUTORS.md](CONTRIBUTORS.md) for the list of contributors.

---

*Built with ❤️ using Angular 21, Node.js, TypeScript, and Ollama*

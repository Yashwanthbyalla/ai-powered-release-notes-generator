# 🚀 Getting Started - Release Notes Generator

## Welcome! 👋

You now have a complete AI-powered release notes generator. This guide will get you up and running in **5 minutes**.

## What You Built

✅ **Angular 21 Frontend** - Modern, responsive UI
✅ **Node.js Backend** - RESTful API with TypeScript
✅ **Ollama AI Integration** - Smart categorization & summaries
✅ **Azure DevOps Support** - Pipeline-based generation
✅ **6 Generation Methods** - Flexible release note creation
✅ **Markdown Export** - Download as CHANGELOG.md

## Quick Start (5 Minutes)

### Step 1: Install Dependencies (2 min)

**Windows:**
```bash
# Double-click setup.bat
# OR run in terminal:
setup.bat
```

**Mac/Linux:**
```bash
npm run install:all
```

### Step 2: Install Ollama (Optional - 2 min)

**For AI features only. Skip if you don't need AI.**

**Windows:**
1. Download: https://ollama.ai/download/windows
2. Install and run:
```bash
ollama pull llama3.2
```

**Mac:**
```bash
brew install ollama
ollama pull llama3.2
```

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama3.2
```

### Step 3: Start Application (1 min)

**Windows:**
```bash
# Double-click start.bat
# OR
start.bat
```

**Mac/Linux:**
```bash
npm run dev
```

**Wait for:**
- ✅ Backend: `🚀 Server running on http://localhost:3000`
- ✅ Frontend: `Application bundle generation complete.`

### Step 4: Open Browser

Navigate to: **http://localhost:4200**

### Step 5: Generate Your First Release Notes

1. **Repository Path**: Enter path to any Git repository
   - Example: `C:\Users\username\projects\my-repo`
   
2. **Method**: Select `Last N Commits`

3. **Count**: Enter `10`

4. **Click**: `Generate Release Notes`

5. **Download**: Click `Download Markdown`

**🎉 Done! You just generated your first release notes!**

---

## What's Next?

### Try Different Methods

#### 📅 Date Range
Perfect for monthly/sprint releases:
```
Method: Date Range
Start: 2024-01-01
End: 2024-01-31
```

#### 🏷️ Tag Range
Compare versions:
```
Method: Tag Range
Start: v1.0.0
End: v2.0.0
```

#### 🌿 Branch Compare
Review feature branches:
```
Method: Branch Compare
Base: main
Compare: feature/new-feature
```

### Enable AI Features

1. Ensure Ollama is running (green indicator)
2. Check `Enable AI Features`
3. Select:
   - ✓ Auto-categorize commits
   - ✓ Generate summary
   - ✓ Detect breaking changes
4. Generate

**Result**: Commits organized into Features, Fixes, Breaking Changes with AI summary!

### Try Azure DevOps Integration

1. Get PAT from Azure DevOps
2. Select `Pipeline Range`
3. Enter:
   - Organization URL
   - Personal Access Token
   - Project Name
4. Select pipeline range
5. Generate

---

## Project Structure

```
generate-release-notes/
│
├── 📱 Frontend (Angular 21)
│   └── http://localhost:4200
│
├── 🔧 Backend (Node.js + Express)
│   └── http://localhost:3000
│
├── 🤖 AI (Ollama)
│   └── http://localhost:11434
│
└── 📚 Documentation
    ├── README.md          - Complete docs
    ├── QUICKSTART.md      - Quick start
    ├── EXAMPLES.md        - Usage examples
    ├── ARCHITECTURE.md    - Technical details
    └── TESTING.md         - Testing guide
```

---

## Common Commands

```bash
# Install everything
npm run install:all

# Start both servers
npm run dev

# Start backend only
npm run backend

# Start frontend only
npm run frontend

# Build for production
npm run build
```

---

## Troubleshooting

### ❌ "Ollama Disconnected"
```bash
ollama serve
```

### ❌ "Failed to retrieve commits"
- Check repository path is correct
- Ensure it's a Git repository (.git folder exists)
- Use absolute path

### ❌ Port already in use
**Backend:**
Edit `backend/.env`:
```
PORT=3001
```

**Frontend:**
Edit `frontend/angular.json`:
```json
"serve": {
  "options": {
    "port": 4201
  }
}
```

### ❌ Dependencies not installing
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Features Overview

### 🎯 Generation Methods

| Method | Use Case | Example |
|--------|----------|---------|
| All Commits | Complete history | Initial documentation |
| Date Range | Time-based | Monthly releases |
| Tag Range | Version-based | v1.0.0 → v2.0.0 |
| Branch Compare | Feature review | main vs feature |
| Last N Commits | Recent changes | Last 20 commits |
| Pipeline Range | Deployment | Build 100 → 150 |

### 🤖 AI Features

| Feature | Purpose | Benefit |
|---------|---------|---------|
| Categorize | Group by type | Organized output |
| Summarize | Executive summary | Quick overview |
| Detect Breaking | Find breaking changes | Risk awareness |

### 📥 Output Options

- **Web View**: Beautiful categorized display
- **Markdown**: Download as CHANGELOG.md
- **Contributors**: Team statistics
- **Metadata**: Hashes, dates, authors

---

## Example Workflows

### 📋 Sprint Release
```
1. Select: Date Range
2. Dates: Sprint start → end
3. Enable AI: Categorize + Summarize
4. Generate
5. Share with team
```

### 🚀 Version Release
```
1. Select: Tag Range
2. Tags: v1.0.0 → v2.0.0
3. Enable AI: All features
4. Generate
5. Download Markdown
6. Add to release notes
```

### 🔍 Feature Review
```
1. Select: Branch Compare
2. Branches: main vs feature
3. Enable AI: Categorize
4. Generate
5. Review before merge
```

---

## Tips for Best Results

### ✍️ Write Good Commit Messages
```bash
# Good
feat: Add user authentication
fix: Resolve memory leak in parser
chore: Update dependencies

# Better for AI
feat(auth): Add OAuth2 authentication with Google
fix(parser): Resolve memory leak in JSON parser
```

### 🏷️ Use Git Tags
```bash
git tag v1.0.0
git tag v2.0.0
git push --tags
```

### 🤖 Keep Ollama Running
- Faster AI responses
- Better user experience
- Background service

---

## Resources

### 📖 Documentation
- [README.md](README.md) - Complete documentation
- [EXAMPLES.md](EXAMPLES.md) - 10 usage examples
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details
- [TESTING.md](TESTING.md) - Testing guide

### 🔗 External Links
- [Angular Docs](https://angular.dev)
- [Ollama](https://ollama.ai)
- [Node.js](https://nodejs.org)
- [Azure DevOps](https://dev.azure.com)

### 💬 Get Help
1. Check documentation
2. Review examples
3. Check console logs
4. Open GitHub issue

---

## What Makes This Special?

### 🆓 100% Free
- No API costs
- No subscriptions
- No hidden fees

### 🔒 Privacy First
- All processing local
- No cloud dependencies
- Your code stays private

### 🚀 Modern Stack
- Angular 21
- TypeScript
- Latest Node.js
- Cutting-edge AI

### 🎨 Beautiful UI
- Responsive design
- Real-time updates
- Intuitive interface

### 🔧 Extensible
- Well documented
- Clean architecture
- Easy to customize

---

## Next Steps

### 🎯 Immediate
1. ✅ Generate first release notes
2. ✅ Try different methods
3. ✅ Enable AI features
4. ✅ Download Markdown

### 📚 Learn More
1. Read EXAMPLES.md
2. Review ARCHITECTURE.md
3. Explore code
4. Customize UI

### 🚀 Advanced
1. Set up ADO integration
2. Create custom templates
3. Add new features
4. Deploy to server

---

## Success Checklist

- [ ] Dependencies installed
- [ ] Backend starts successfully
- [ ] Frontend loads in browser
- [ ] Generated first release notes
- [ ] Downloaded Markdown file
- [ ] Ollama connected (if installed)
- [ ] Tried multiple methods
- [ ] Read documentation

---

## 🎉 Congratulations!

You're now ready to generate professional release notes with AI!

**Key Points:**
- ✅ 6 generation methods
- ✅ AI-powered categorization
- ✅ Azure DevOps integration
- ✅ Beautiful UI
- ✅ 100% free and local

**Start generating amazing release notes today!** 🚀

---

## Quick Reference

```bash
# Setup
setup.bat

# Start
start.bat

# Access
http://localhost:4200

# Ollama
ollama serve
ollama pull llama3.2

# Help
See README.md
```

---

**Built with ❤️ using Angular 21, Node.js, and Ollama**

**Questions?** Check the documentation or open an issue!

**Happy Release Note Generating! 🎊**

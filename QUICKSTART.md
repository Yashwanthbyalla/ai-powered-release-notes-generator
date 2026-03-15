# Quick Start Guide

## 1. Install Dependencies (5 minutes)

```bash
# Install all dependencies
npm run install:all
```

## 2. Install Ollama (Optional - for AI features)

### Windows
1. Download from https://ollama.ai/download/windows
2. Run installer
3. Open terminal and run:
```bash
ollama pull llama3.2
```

### macOS
```bash
brew install ollama
ollama pull llama3.2
```

### Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama3.2
```

## 3. Start the Application

```bash
# Start both frontend and backend
npm run dev
```

Wait for:
- Backend: `🚀 Server running on http://localhost:3000`
- Frontend: `Application bundle generation complete.`

## 4. Open Browser

Navigate to: http://localhost:4200

## 5. Generate Your First Release Notes

1. **Enter Repository Path**
   - Windows: `C:\Users\username\projects\my-repo`
   - Mac/Linux: `/Users/username/projects/my-repo`

2. **Select "All Commits"** (simplest option)

3. **Click "Generate Release Notes"**

4. **View Results** and click "Download Markdown"

## 6. Try AI Features

1. Ensure Ollama is running (check green status indicator)
2. Check "Enable AI Features"
3. Select:
   - ✓ Auto-categorize commits
   - ✓ Generate summary
4. Click "Generate Release Notes"

## Common Issues

### "Ollama Disconnected"
```bash
# Start Ollama
ollama serve
```

### "Failed to retrieve commits"
- Check repository path is correct
- Ensure it's a valid Git repository
- Try absolute path instead of relative

### Port already in use
```bash
# Backend (change PORT in backend/.env)
PORT=3001

# Frontend (change in angular.json serve options)
"port": 4201
```

## Next Steps

- Try different generation methods (Date Range, Tag Range)
- Set up Azure DevOps integration
- Customize AI model in `backend/.env`
- Read full README.md for advanced features

## Test with This Repository

```bash
# Use this project as test
# In the app, enter path to this repository
# Select "Last N Commits" and enter 10
# Generate to see your recent commits
```

Enjoy! 🚀

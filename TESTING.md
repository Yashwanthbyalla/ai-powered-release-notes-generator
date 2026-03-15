# Installation & Testing Guide

## Prerequisites Check

Before starting, verify you have:

```bash
# Check Node.js (need v18+)
node --version

# Check npm
npm --version

# Check Git
git --version
```

If any are missing:
- **Node.js**: Download from https://nodejs.org (LTS version)
- **Git**: Download from https://git-scm.com

## Step-by-Step Installation

### Step 1: Get the Code

```bash
# If you have the code already
cd generate-release-notes

# Or clone from repository
git clone <repository-url>
cd generate-release-notes
```

### Step 2: Run Setup Script (Windows)

```bash
# Double-click setup.bat
# OR run from command line:
setup.bat
```

This will:
- Install root dependencies
- Install backend dependencies
- Install frontend dependencies
- Create .env file

**Manual Installation (if script fails)**:
```bash
# Install root
npm install

# Install backend
cd backend
npm install
cd ..

# Install frontend
cd frontend
npm install
cd ..
```

### Step 3: Install Ollama (Optional - for AI features)

#### Windows
1. Download: https://ollama.ai/download/windows
2. Run installer
3. Open Command Prompt:
```bash
ollama pull llama3.2
```

#### macOS
```bash
brew install ollama
ollama pull llama3.2
```

#### Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama3.2
```

**Verify Ollama**:
```bash
# Check if running
curl http://localhost:11434/api/tags

# Should return JSON with available models
```

### Step 4: Start the Application

#### Option A: Use Start Script (Windows)
```bash
# Double-click start.bat
# OR
start.bat
```

#### Option B: Manual Start
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

#### Option C: Single Command
```bash
npm run dev
```

### Step 5: Verify Installation

1. **Check Backend**: Open http://localhost:3000/health
   - Should see: `{"status":"ok"}`

2. **Check Frontend**: Open http://localhost:4200
   - Should see the Release Notes Generator UI

3. **Check Ollama**: Look at status indicator in UI
   - Green "✓ Ollama Connected" = Working
   - Red "✗ Ollama Disconnected" = Not running or not installed

## Testing the Application

### Test 1: Basic Functionality (No AI)

**Objective**: Generate release notes without AI features

1. Open http://localhost:4200
2. Enter Repository Path: `C:\Users\<your-username>\Yash\my_codes\generate-release-notes`
3. Select: `Last N Commits`
4. Enter: `5`
5. Keep AI disabled
6. Click `Generate Release Notes`

**Expected Result**:
- Loading indicator appears
- Results section shows 5 commits
- Contributors list appears
- No errors

**If it fails**:
- Check repository path is correct
- Ensure path has Git repository (.git folder)
- Check backend console for errors

---

### Test 2: Date Range Generation

**Objective**: Filter commits by date

1. Select: `Date Range`
2. Start Date: `2024-01-01`
3. End Date: `2024-12-31`
4. Click `Generate Release Notes`

**Expected Result**:
- Shows commits within date range
- Date range displayed in results
- Contributors for that period

---

### Test 3: AI Categorization

**Objective**: Test AI features

**Prerequisites**: Ollama must be running and connected

1. Select: `Last N Commits`
2. Enter: `10`
3. Check: `Enable AI Features`
4. Check: `Auto-categorize commits`
5. Click `Generate Release Notes`

**Expected Result**:
- Commits categorized into sections:
  - ✨ Features
  - 🐛 Bug Fixes
  - 🔧 Other Changes
- Categories based on commit messages

**If it fails**:
- Check Ollama status (green indicator)
- Restart Ollama: `ollama serve`
- Check backend console for Ollama errors

---

### Test 4: AI Summary Generation

**Objective**: Generate AI summary

1. Select: `Last N Commits`
2. Enter: `20`
3. Check: `Enable AI Features`
4. Check: `Generate summary`
5. Click `Generate Release Notes`

**Expected Result**:
- Summary section appears at top
- 2-3 sentence description of changes
- Summary is contextual to commits

**Note**: First generation may be slow (model loading)

---

### Test 5: Download Markdown

**Objective**: Export release notes

1. Generate any release notes
2. Click `Download Markdown`

**Expected Result**:
- File `CHANGELOG.md` downloads
- Opens in text editor
- Contains formatted markdown
- Includes all sections from UI

---

### Test 6: Tag Range (If repo has tags)

**Objective**: Compare between tags

1. Select: `Tag Range`
2. Wait for tags to load in dropdowns
3. Select Start Tag: (older tag)
4. Select End Tag: (newer tag)
5. Click `Generate Release Notes`

**Expected Result**:
- Shows commits between tags
- Title shows tag range

**If no tags**:
- Create test tags:
```bash
cd <your-repo>
git tag v1.0.0 HEAD~10
git tag v1.1.0 HEAD
```

---

### Test 7: Branch Compare

**Objective**: Compare branches

1. Select: `Branch Compare`
2. Wait for branches to load
3. Base Branch: `main` (or `master`)
4. Compare Branch: (any other branch)
5. Click `Generate Release Notes`

**Expected Result**:
- Shows commits unique to compare branch
- Useful for PR reviews

---

### Test 8: Azure DevOps Integration

**Objective**: Test ADO pipeline integration

**Prerequisites**:
- Azure DevOps account
- Personal Access Token
- Project with pipelines

1. Select: `Pipeline Range`
2. ADO Organization URL: `https://dev.azure.com/yourorg`
3. ADO Personal Access Token: `<your-pat>`
4. Project Name: `<your-project>`
5. Tab out of Project Name field (triggers pipeline load)
6. Select Start Pipeline
7. Select End Pipeline
8. Click `Generate Release Notes`

**Expected Result**:
- Pipelines load in dropdowns
- Shows commits between pipeline runs
- Includes PR information

**If it fails**:
- Verify PAT has Build (Read) permissions
- Check organization URL format
- Ensure project name is exact match

---

## Performance Testing

### Large Repository Test

**Objective**: Test with many commits

1. Use repository with 1000+ commits
2. Select: `All Commits`
3. Disable AI (for speed)
4. Click `Generate Release Notes`

**Expected Result**:
- Completes within 10 seconds
- All commits displayed
- No memory issues

---

### AI Performance Test

**Objective**: Test AI with many commits

1. Select: `Last N Commits`
2. Enter: `50`
3. Enable all AI features
4. Click `Generate Release Notes`

**Expected Result**:
- Completes within 30-60 seconds
- All commits categorized
- Summary generated

**Note**: Time depends on Ollama model and hardware

---

## Troubleshooting Tests

### Test: Backend Not Starting

**Symptoms**: Backend won't start, port error

**Solution**:
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill process or change port
# Edit backend/.env
PORT=3001
```

---

### Test: Frontend Not Starting

**Symptoms**: Frontend build errors

**Solution**:
```bash
cd frontend
# Clear cache
rmdir /s /q node_modules
rmdir /s /q .angular
npm install
npm start
```

---

### Test: Ollama Connection

**Symptoms**: Red "Ollama Disconnected"

**Solution**:
```bash
# Check Ollama status
ollama list

# Start Ollama
ollama serve

# Test API
curl http://localhost:11434/api/tags
```

---

### Test: Git Operations Failing

**Symptoms**: "Failed to retrieve commits"

**Solution**:
1. Verify path is correct
2. Check path has .git folder
3. Try absolute path instead of relative
4. Ensure Git is in PATH:
```bash
git --version
```

---

## Automated Testing (Future)

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
npm run e2e
```

---

## Validation Checklist

After installation, verify:

- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Can enter repository path
- [ ] Can generate basic release notes
- [ ] Can download markdown file
- [ ] Ollama status shows correctly
- [ ] All generation methods work
- [ ] AI features work (if Ollama installed)
- [ ] No console errors
- [ ] UI is responsive

---

## Getting Help

If tests fail:

1. **Check Console Logs**
   - Backend: Terminal running backend
   - Frontend: Browser DevTools (F12)

2. **Verify Prerequisites**
   - Node.js version
   - Git installation
   - Repository validity

3. **Review Documentation**
   - README.md
   - QUICKSTART.md
   - EXAMPLES.md

4. **Common Issues**
   - Port conflicts → Change ports
   - Path issues → Use absolute paths
   - Ollama issues → Restart service
   - Dependencies → Reinstall

5. **Report Issues**
   - Include error messages
   - Include console logs
   - Include system info (OS, Node version)

---

## Success Criteria

Installation is successful when:

✅ Both servers start without errors
✅ UI loads and is responsive
✅ Can generate release notes from test repository
✅ Can download markdown file
✅ Ollama connection works (if installed)
✅ No errors in console

---

## Next Steps After Testing

1. **Try Different Repositories**
   - Test with your actual projects
   - Try different generation methods

2. **Experiment with AI**
   - Try different Ollama models
   - Compare categorization results

3. **Customize**
   - Adjust AI prompts in backend
   - Modify UI styling
   - Add custom features

4. **Integrate into Workflow**
   - Add to CI/CD pipeline
   - Create scheduled tasks
   - Share with team

---

**Happy Testing! 🚀**

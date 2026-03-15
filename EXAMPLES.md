# Usage Examples

## Example 1: Generate All Commits

**Use Case**: First-time release notes for entire project

**Steps**:
1. Repository Path: `C:\projects\my-app`
2. Generation Method: `All Commits`
3. Enable AI: `Yes`
   - ✓ Auto-categorize commits
   - ✓ Generate summary
4. Click `Generate Release Notes`

**Output**: Complete history with AI categorization

---

## Example 2: Monthly Release Notes

**Use Case**: Generate notes for January 2024

**Steps**:
1. Repository Path: `C:\projects\my-app`
2. Generation Method: `Date Range`
3. Start Date: `2024-01-01`
4. End Date: `2024-01-31`
5. Enable AI: `Yes`
   - ✓ Auto-categorize commits
   - ✓ Generate summary
   - ✓ Detect breaking changes
6. Click `Generate Release Notes`

**Output**: January commits categorized by type

---

## Example 3: Version Release (Tag-based)

**Use Case**: Release notes from v1.0.0 to v2.0.0

**Steps**:
1. Repository Path: `C:\projects\my-app`
2. Generation Method: `Tag Range`
3. Start Tag: `v1.0.0`
4. End Tag: `v2.0.0`
5. Enable AI: `Yes`
6. Click `Generate Release Notes`

**Output**: All changes between versions with breaking change detection

---

## Example 4: Feature Branch Review

**Use Case**: Review changes before merging feature branch

**Steps**:
1. Repository Path: `C:\projects\my-app`
2. Generation Method: `Branch Compare`
3. Base Branch: `main`
4. Compare Branch: `feature/new-dashboard`
5. Enable AI: `Yes`
   - ✓ Auto-categorize commits
6. Click `Generate Release Notes`

**Output**: Summary of feature branch changes

---

## Example 5: Quick Recent Changes

**Use Case**: Quick overview of last 20 commits

**Steps**:
1. Repository Path: `C:\projects\my-app`
2. Generation Method: `Last N Commits`
3. Number of Commits: `20`
4. Enable AI: `No` (for speed)
5. Click `Generate Release Notes`

**Output**: Last 20 commits with contributors

---

## Example 6: Azure DevOps Pipeline Release

**Use Case**: Generate notes between production deployments

**Prerequisites**:
- Azure DevOps account
- Personal Access Token with Build (Read) permissions

**Steps**:
1. Repository Path: `C:\projects\my-app`
2. Generation Method: `Pipeline Range`
3. ADO Organization URL: `https://dev.azure.com/mycompany`
4. ADO Personal Access Token: `your-pat-token`
5. Project Name: `MyProject`
6. Wait for pipelines to load
7. Start Pipeline: Select previous production pipeline
8. End Pipeline: Select latest pipeline
9. Enable AI: `Yes`
   - ✓ Auto-categorize commits
   - ✓ Generate summary
   - ✓ Detect breaking changes
10. Click `Generate Release Notes`

**Output**: Changes deployed between pipeline runs with PR information

---

## Example 7: Sprint Release Notes

**Use Case**: Generate notes for 2-week sprint

**Steps**:
1. Repository Path: `C:\projects\my-app`
2. Generation Method: `Date Range`
3. Start Date: `2024-01-15` (Sprint start)
4. End Date: `2024-01-28` (Sprint end)
5. Enable AI: `Yes`
   - ✓ Auto-categorize commits
   - ✓ Generate summary
6. Click `Generate Release Notes`

**Output**: Sprint summary with categorized changes

---

## Example 8: Hotfix Release

**Use Case**: Document emergency hotfix

**Steps**:
1. Repository Path: `C:\projects\my-app`
2. Generation Method: `Last N Commits`
3. Number of Commits: `3`
4. Enable AI: `No` (quick generation)
5. Click `Generate Release Notes`

**Output**: Quick hotfix documentation

---

## Example 9: Quarterly Review

**Use Case**: Executive summary for Q1 2024

**Steps**:
1. Repository Path: `C:\projects\my-app`
2. Generation Method: `Date Range`
3. Start Date: `2024-01-01`
4. End Date: `2024-03-31`
5. Enable AI: `Yes`
   - ✓ Auto-categorize commits
   - ✓ Generate summary
   - ✓ Detect breaking changes
6. Click `Generate Release Notes`
7. Download Markdown

**Output**: Comprehensive quarterly report with AI summary

---

## Example 10: Multi-Team Contribution Report

**Use Case**: See all team contributions for the month

**Steps**:
1. Repository Path: `C:\projects\my-app`
2. Generation Method: `Date Range`
3. Start Date: `2024-01-01`
4. End Date: `2024-01-31`
5. Enable AI: `No`
6. Click `Generate Release Notes`
7. Focus on Contributors section

**Output**: Detailed contributor statistics

---

## Tips for Best Results

### For AI Categorization
- Use conventional commit format: `feat:`, `fix:`, `chore:`
- Write descriptive commit messages
- Include ticket numbers in commits

### For Date Ranges
- Use ISO format: YYYY-MM-DD
- Include full days (00:00:00 to 23:59:59)

### For Tag Ranges
- Create semantic version tags: v1.0.0, v2.0.0
- Tag before major releases

### For Branch Compare
- Keep feature branches focused
- Merge frequently to main/develop

### For Pipeline Range
- Ensure pipelines have clear naming
- Tag production deployments
- Link commits to work items

---

## Sample Output Formats

### With AI Categorization
```markdown
# Release v2.0.0

**Date Range:** 1/1/2024 - 3/31/2024

## Summary
Major release including authentication system, 
performance improvements, and bug fixes.

## 🚨 Breaking Changes
- abc1234 - Remove legacy API endpoints

## ✨ Features (15)
- def5678 - Add OAuth2 authentication
- ghi9012 - Implement caching layer

## 🐛 Bug Fixes (8)
- jkl3456 - Fix memory leak

## 👥 Contributors (5)
- John Doe (45 commits)
- Jane Smith (32 commits)
```

### Without AI (Simple List)
```markdown
# All Commits

**Date Range:** 1/1/2024 - 12/31/2024

## 🔄 All Commits (150)
- abc1234 - Add login page (John, 1/15/2024)
- def5678 - Fix bug in parser (Jane, 1/16/2024)

## 👥 Contributors (10)
- John Doe (45 commits)
- Jane Smith (32 commits)
```

---

## Automation Ideas

### Weekly Release Notes
Create a scheduled task to generate weekly notes:
```bash
# Run every Friday at 5 PM
# Generate notes for the week
```

### Pre-Release Checklist
Before each release:
1. Generate tag-based notes
2. Review breaking changes
3. Update CHANGELOG.md
4. Share with team

### Sprint Retrospective
At sprint end:
1. Generate sprint date range notes
2. Review with team
3. Identify patterns
4. Plan improvements

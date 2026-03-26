import axios from 'axios';
import { Commit } from '../types';

export class OllamaService {
  private baseUrl: string;
  private model: string;

  constructor(baseUrl: string = 'http://localhost:11434', model: string = 'llama3.2') {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  async categorizeCommits(commits: Commit[]) {
    const features: Commit[] = [];
    const fixes: Commit[] = [];
    const breaking: Commit[] = [];
    const other: Commit[] = [];

    for (const commit of commits) {
      const category = this.categorizeCommitSimple(commit.message);
      
      if (category === 'feature') {
        features.push(commit);
      } else if (category === 'fix') {
        fixes.push(commit);
      } else if (category === 'breaking') {
        breaking.push(commit);
      } else {
        other.push(commit);
      }
    }

    return { features, fixes, breaking, other };
  }

  async generateSummary(commits: Commit[]): Promise<string> {
    const commitDetails = commits.slice(0, 50).map(c => {
      let detail = `- ${c.message}`;
      if (c.body && c.body.trim()) {
        detail += `\n  Description: ${c.body.trim()}`;
      }
      return detail;
    }).join('\n');

    const prompt = `You are a senior technical writer creating detailed release notes. Analyze these git commits thoroughly with their titles and descriptions.

Commits:
${commitDetails}

Generate a detailed release summary in EXACTLY this format:

**Release Overview:**
[4-5 sentences describing the overall scope, goals, and impact of this release. Mention the number of changes, areas affected, and the overall direction of improvements.]

**Key Highlights:**
• [Feature/improvement 1 - explain what it does, why it matters, and how it benefits users in 2-3 sentences]
• [Feature/improvement 2 - explain what it does, why it matters, and how it benefits users in 2-3 sentences]
• [Feature/improvement 3 - explain what it does, why it matters, and how it benefits users in 2-3 sentences]
• [Feature/improvement 4 - explain what it does, why it matters, and how it benefits users in 2-3 sentences]
• [Feature/improvement 5 - explain what it does, why it matters, and how it benefits users in 2-3 sentences]

**Bug Fixes & Improvements:**
• [Bug fix 1 - describe the problem that was fixed and its impact]
• [Bug fix 2 - describe the problem that was fixed and its impact]
• [Bug fix 3 - describe the problem that was fixed and its impact]
• [Performance or stability improvement - describe what was improved and the expected outcome]
• [Technical debt or refactoring - describe what was cleaned up or optimized]

**Technical Changes:**
• [Technical change 1 - describe architectural or code-level changes relevant to developers]
• [Technical change 2 - describe dependency updates, configuration changes, or tooling improvements]
• [Technical change 3 - describe any API changes, schema updates, or integration changes]

**Impact:**
[3-4 sentences about who benefits from this release, what problems it solves, and what users can expect after upgrading. Mention any areas that saw the most improvement.]

IMPORTANT: Follow this exact structure strictly. Use bold headings (**text**) and bullet points (•). Be specific and detailed using information from commit titles and descriptions. Do not skip any section. Each bullet point must be 2-3 sentences with meaningful context.`;

    const response = await axios.post(`${this.baseUrl}/api/generate`, {
      model: this.model,
      prompt,
      stream: false
    });

    return response.data.response;
  }

  private generateSimpleSummary(commits: Commit[]): string {
    const total = commits.length;
    const authors = new Set(commits.map(c => c.author)).size;
    return `This release includes ${total} commit${total !== 1 ? 's' : ''} from ${authors} contributor${authors !== 1 ? 's' : ''}.`;
  }

  async detectBreakingChanges(commits: Commit[]): Promise<Commit[]> {
    return commits.filter(commit => this.isBreakingChange(commit.message));
  }

  private categorizeCommitSimple(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Conventional commits
    if (lowerMessage.startsWith('feat:') || lowerMessage.startsWith('feat(')) return 'feature';
    if (lowerMessage.startsWith('fix:') || lowerMessage.startsWith('fix(')) return 'fix';
    if (lowerMessage.startsWith('feature:')) return 'feature';
    if (lowerMessage.startsWith('bug:')) return 'fix';
    
    // Breaking changes
    if (lowerMessage.includes('breaking change') || lowerMessage.includes('!:')) return 'breaking';
    if (lowerMessage.startsWith('breaking:')) return 'breaking';
    
    // Keywords in message
    if (lowerMessage.includes('add ') || lowerMessage.includes('implement ') || lowerMessage.includes('create ')) return 'feature';
    if (lowerMessage.includes('fix ') || lowerMessage.includes('resolve ') || lowerMessage.includes('patch ')) return 'fix';
    
    return 'other';
  }

  private isBreakingChange(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    return lowerMessage.includes('breaking') || 
           lowerMessage.includes('!:') || 
           lowerMessage.includes('major:');
  }

  async generateReleaseNotes(commitsData: string): Promise<string> {
    const prompt = `Based on the following commit data with titles and descriptions, generate professional release notes in markdown format.

Analyze both commit titles and their detailed descriptions to:
1. Identify user-facing changes and their benefits
2. Highlight major features with context from descriptions
3. Explain important fixes and their impact
4. Note any breaking changes or migration requirements

Commit Data:
${commitsData}

Generate detailed, well-structured release notes with sections for major features, improvements, and fixes. Use the commit descriptions to provide meaningful context.`;

    const response = await axios.post(`${this.baseUrl}/api/generate`, {
      model: this.model,
      prompt,
      stream: false
    });

    return response.data.response;
  }

  async checkConnection(): Promise<boolean> {
    try {
      await axios.get(`${this.baseUrl}/api/tags`);
      return true;
    } catch {
      return false;
    }
  }
}

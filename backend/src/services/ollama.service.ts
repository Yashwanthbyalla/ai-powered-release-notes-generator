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
    const isConnected = await this.checkConnection();
    if (!isConnected) {
      return this.generateSimpleSummary(commits);
    }

    const commitDetails = commits.slice(0, 50).map(c => {
      let detail = `- ${c.message}`;
      if (c.body && c.body.trim()) {
        detail += `\n  Description: ${c.body.trim()}`;
      }
      return detail;
    }).join('\n');

    const prompt = `Analyze these git commits with their titles and descriptions, then generate a comprehensive release summary (6-8 lines). 

Provide:
1. Overview of major changes and their impact
2. Key features added with brief explanations
3. Important bug fixes and improvements
4. Any notable technical changes

Commits:
${commitDetails}

Generate a detailed, professional summary that gives readers a clear understanding of what changed in this release.`;

    try {
      const response = await axios.post(`${this.baseUrl}/api/generate`, {
        model: this.model,
        prompt,
        stream: false
      }, { timeout: 30000 });

      return response.data.response;
    } catch (error) {
      return this.generateSimpleSummary(commits);
    }
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
    const isConnected = await this.checkConnection();
    if (!isConnected) {
      return 'AI service not available. Please ensure Ollama is running.';
    }

    const prompt = `Based on the following commit data with titles and descriptions, generate professional release notes in markdown format.

Analyze both commit titles and their detailed descriptions to:
1. Identify user-facing changes and their benefits
2. Highlight major features with context from descriptions
3. Explain important fixes and their impact
4. Note any breaking changes or migration requirements

Commit Data:
${commitsData}

Generate detailed, well-structured release notes with sections for major features, improvements, and fixes. Use the commit descriptions to provide meaningful context.`;

    try {
      const response = await axios.post(`${this.baseUrl}/api/generate`, {
        model: this.model,
        prompt,
        stream: false
      }, { timeout: 60000 });

      return response.data.response;
    } catch (error) {
      throw new Error('Failed to generate AI release notes');
    }
  }

  async checkConnection(): Promise<boolean> {
    try {
      await axios.get(`${this.baseUrl}/api/tags`, { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }
}

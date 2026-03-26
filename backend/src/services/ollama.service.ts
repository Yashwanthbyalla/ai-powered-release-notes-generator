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

    const commitMessages = commits.map(c => c.message).slice(0, 50).join('\n');
    const prompt = `Summarize these git commits into a detailed release summary (4-5 lines). Include key features, fixes, and improvements:\n\n${commitMessages}`;

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

    const prompt = `Based on the following commit data, generate professional release notes in markdown format. Focus on user-facing changes and improvements:\n\n${commitsData}\n\nGenerate concise, well-structured release notes with sections for major features, improvements, and fixes.`;

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

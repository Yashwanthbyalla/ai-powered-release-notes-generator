import { GitService } from './git.service';
import { OllamaService } from './ollama.service';
import { AdoService } from './ado.service';
import { ReleaseNotesOptions, ReleaseNotes, Commit } from '../types';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs/promises';
import simpleGit from 'simple-git';

export class ReleaseNotesService {
  async generate(options: ReleaseNotesOptions): Promise<ReleaseNotes> {
    let repoPath = options.repoPath;
    let tempDir: string | null = null;

    // Handle ADO URL by cloning to temp directory
    if (options.adoUrl) {
      tempDir = await this.cloneAdoRepo(options.adoUrl);
      repoPath = tempDir;
    }

    if (!repoPath) {
      throw new Error('Repository path or ADO URL is required');
    }

    const gitService = new GitService(repoPath);
    let commits: Commit[] = [];

    // Get commits based on source
    switch (options.source) {
      case 'all-commits':
        commits = await gitService.getAllCommits();
        break;
      case 'date-range':
        commits = await gitService.getCommitsByDateRange(options.startDate!, options.endDate!);
        break;
      case 'tag-range':
        commits = await gitService.getCommitsByTagRange(options.startTag!, options.endTag!);
        break;
      case 'branch-compare':
        commits = await gitService.getCommitsByBranchCompare(options.baseBranch!, options.compareBranch!);
        break;
      case 'last-n-commits':
        commits = await gitService.getLastNCommits(options.commitCount || 10);
        break;
      case 'pipeline-range':
        commits = await this.getCommitsFromPipelines(options);
        break;
    }

    const contributors = await gitService.getContributors(commits);

    const releaseNotes: ReleaseNotes = {
      title: this.generateTitle(options, commits),
      dateRange: this.generateDateRange(options, commits),
      commits,
      contributors
    };

    const ollamaService = new OllamaService();

    // Categorization & breaking change detection (keyword-based, no AI needed)
    if (options.aiFeatures?.categorize || options.enableAI) {
      releaseNotes.categorized = await ollamaService.categorizeCommits(commits);
    }
    if (options.aiFeatures?.detectBreaking && releaseNotes.categorized) {
      releaseNotes.categorized.breaking = await ollamaService.detectBreakingChanges(commits);
    }

    // AI summary (requires Ollama)
    if (options.enableAI && options.aiFeatures?.summarize) {
      releaseNotes.summary = await ollamaService.generateSummary(commits);
    }

    // Clean up temp directory if created
    if (tempDir) {
      await this.cleanupTempDir(tempDir);
    }

    return releaseNotes;
  }

  public async cloneAdoRepo(adoUrl: string): Promise<string> {
    const tempDir = path.join(os.tmpdir(), `ado-repo-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });
    
    const git = simpleGit();
    await git.clone(adoUrl, tempDir);
    
    return tempDir;
  }

  public async cleanupTempDir(tempDir: string): Promise<void> {
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (error) {
      console.warn('Failed to cleanup temp directory:', error);
    }
  }

  private async getCommitsFromPipelines(options: ReleaseNotesOptions): Promise<Commit[]> {
    // This would integrate with ADO to get commits between pipeline runs
    // For now, return empty array as placeholder
    return [];
  }

  private generateTitle(options: ReleaseNotesOptions, commits: Commit[]): string {
    const titles: Record<string, string> = {
      'all-commits': 'All Commits',
      'date-range': `Commits from ${options.startDate} to ${options.endDate}`,
      'tag-range': `Changes from ${options.startTag} to ${options.endTag}`,
      'branch-compare': `${options.baseBranch} vs ${options.compareBranch}`,
      'last-n-commits': `Last ${commits.length} Commits`,
      'pipeline-range': `Pipeline ${options.startPipelineId} to ${options.endPipelineId}`
    };
    return titles[options.source] || 'Release Notes';
  }

  private generateDateRange(options: ReleaseNotesOptions, commits: Commit[]): string {
    if (commits.length === 0) return 'No commits';
    
    const dates = commits.map(c => new Date(c.date));
    const earliest = new Date(Math.min(...dates.map(d => d.getTime())));
    const latest = new Date(Math.max(...dates.map(d => d.getTime())));
    
    return `${earliest.toLocaleDateString()} - ${latest.toLocaleDateString()}`;
  }
}

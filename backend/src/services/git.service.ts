import simpleGit, { SimpleGit, LogResult } from 'simple-git';
import { Commit, Contributor } from '../types';

export class GitService {
  private git: SimpleGit;

  constructor(repoPath: string) {
    this.git = simpleGit(repoPath);
  }

  async getAllCommits(): Promise<Commit[]> {
    const log = await this.git.log();
    return this.formatCommits(log);
  }

  async getCommitsByDateRange(startDate: string, endDate: string): Promise<Commit[]> {
    const log = await this.git.log([
      `--since=${startDate}`,
      `--until=${endDate}`,
    ]);
    return this.formatCommits(log);
  }

  async getCommitsByTagRange(startTag: string, endTag: string): Promise<Commit[]> {
    const log = await this.git.log({ from: startTag, to: endTag });
    return this.formatCommits(log);
  }

  async getCommitsByBranchCompare(baseBranch: string, compareBranch: string): Promise<Commit[]> {
    const log = await this.git.log({ from: baseBranch, to: compareBranch });
    return this.formatCommits(log);
  }

  async getLastNCommits(count: number): Promise<Commit[]> {
    const log = await this.git.log({ maxCount: count });
    return this.formatCommits(log);
  }

  async getContributors(commits: Commit[]): Promise<Contributor[]> {
    const contributorMap = new Map<string, Contributor>();
    
    commits.forEach(commit => {
      const key = commit.author;
      if (contributorMap.has(key)) {
        contributorMap.get(key)!.count++;
      } else {
        contributorMap.set(key, {
          name: commit.author,
          email: '',
          count: 1
        });
      }
    });

    return Array.from(contributorMap.values()).sort((a, b) => b.count - a.count);
  }

  async getTags(): Promise<string[]> {
    const tags = await this.git.tags();
    return tags.all;
  }

  async getBranches(): Promise<string[]> {
    const branches = await this.git.branchLocal();
    return branches.all;
  }

  private formatCommits(log: LogResult): Commit[] {
    return log.all.map(commit => ({
      hash: commit.hash.substring(0, 7),
      author: commit.author_name,
      date: commit.date,
      message: commit.message,
      body: commit.body
    }));
  }
}

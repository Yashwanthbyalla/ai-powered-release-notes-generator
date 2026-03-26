import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { ReleaseNotesOptions, ReleaseNotes, Pipeline } from './models/release-notes.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  options: ReleaseNotesOptions = {
    source: 'all-commits',
    repoPath: '',
    enableAI: false,
    aiFeatures: {
      categorize: false,
      summarize: false,
      detectBreaking: false
    }
  };

  releaseNotes: ReleaseNotes | null = null;
  loading = false;
  error = '';
  ollamaConnected = false;
  tags: string[] = [];
  branches: string[] = [];
  pipelines: Pipeline[] = [];
  adoOrgUrl = '';
  adoToken = '';
  openAccordion: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.checkOllama();
  }

  checkOllama() {
    this.apiService.checkOllamaStatus().subscribe({
      next: (status) => this.ollamaConnected = status.connected,
      error: () => this.ollamaConnected = false
    });
  }

  onSourceChange() {
    const repoPath = this.options.adoUrl || this.options.repoPath;
    if (repoPath) {
      if (this.options.source === 'tag-range') {
        this.loadTags();
      } else if (this.options.source === 'branch-compare') {
        this.loadBranches();
      } else if (this.options.source === 'pipeline-range') {
        this.loadPipelines();
      }
    }
  }

  loadTags() {
    const repoPath = this.options.adoUrl || this.options.repoPath;
    this.apiService.getTags(repoPath).subscribe({
      next: (tags) => this.tags = tags,
      error: (err) => this.error = 'Failed to load tags'
    });
  }

  loadBranches() {
    const repoPath = this.options.adoUrl || this.options.repoPath;
    this.apiService.getBranches(repoPath).subscribe({
      next: (branches) => this.branches = branches,
      error: (err) => this.error = 'Failed to load branches'
    });
  }

  loadPipelines() {
    if (this.adoOrgUrl && this.adoToken && this.options.adoProject) {
      this.apiService.getPipelines(this.options.adoProject, this.adoOrgUrl, this.adoToken).subscribe({
        next: (pipelines) => this.pipelines = pipelines,
        error: (err) => this.error = 'Failed to load pipelines'
      });
    }
  }

  generate() {
    this.loading = true;
    this.error = '';
    this.releaseNotes = null;

    this.apiService.generateReleaseNotes(this.options).subscribe({
      next: (notes) => {
        this.releaseNotes = notes;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to generate release notes';
        this.loading = false;
      }
    });
  }

  downloadMarkdown() {
    if (!this.releaseNotes) return;

    const markdown = this.generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CHANGELOG.md';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  formatSummary(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\* (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.+)/, '<p>$1')
      .replace(/(.+)$/, '$1</p>')
      .replace(/<p><ul>/g, '<ul>')
      .replace(/<\/ul><\/p>/g, '</ul>')
      .replace(/<p><\/p>/g, '');
  }

  private generateMarkdown(): string {
    if (!this.releaseNotes) return '';

    let md = `# ${this.releaseNotes.title}\n\n`;
    md += `**Date Range:** ${this.releaseNotes.dateRange}\n\n`;

    if (this.releaseNotes.summary) {
      md += `## Summary\n\n${this.releaseNotes.summary}\n\n`;
    }

    if (this.releaseNotes.categorized) {
      const { features, fixes, breaking, other } = this.releaseNotes.categorized;

      if (breaking.length > 0) {
        md += `## 🚨 Breaking Changes\n\n`;
        breaking.forEach(c => {
          md += `- ${c.hash} - ${c.message} (${c.author})\n`;
          if (c.body) md += `  ${c.body.replace(/\n/g, '\n  ')}\n`;
        });
        md += '\n';
      }

      if (features.length > 0) {
        md += `## ✨ Features\n\n`;
        features.forEach(c => {
          md += `- ${c.hash} - ${c.message} (${c.author})\n`;
          if (c.body) md += `  ${c.body.replace(/\n/g, '\n  ')}\n`;
        });
        md += '\n';
      }

      if (fixes.length > 0) {
        md += `## 🐛 Bug Fixes\n\n`;
        fixes.forEach(c => {
          md += `- ${c.hash} - ${c.message} (${c.author})\n`;
          if (c.body) md += `  ${c.body.replace(/\n/g, '\n  ')}\n`;
        });
        md += '\n';
      }

      if (other.length > 0) {
        md += `## 🔧 Other Changes\n\n`;
        other.forEach(c => {
          md += `- ${c.hash} - ${c.message} (${c.author})\n`;
          if (c.body) md += `  ${c.body.replace(/\n/g, '\n  ')}\n`;
        });
        md += '\n';
      }
    } else {
      md += `## 🔄 Commits\n\n`;
      this.releaseNotes.commits.forEach(c => {
        md += `- ${c.hash} - ${c.message} (${c.author}, ${new Date(c.date).toLocaleDateString()})\n`;
        if (c.body) md += `  ${c.body.replace(/\n/g, '\n  ')}\n`;
      });
      md += '\n';
    }

    md += `## 👥 Contributors\n\n`;
    this.releaseNotes.contributors.forEach(c => {
      md += `- ${c.name} (${c.count} commits)\n`;
    });

    return md;
  }

  toggleAccordion(category: string) {
    this.openAccordion = this.openAccordion === category ? null : category;
  }
}

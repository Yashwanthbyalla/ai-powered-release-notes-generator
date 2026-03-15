export interface ReleaseNotesOptions {
  source: 'all-commits' | 'date-range' | 'tag-range' | 'branch-compare' | 'pipeline-range' | 'last-n-commits';
  repoPath: string;
  adoUrl?: string;
  adoToken?: string;
  startDate?: string;
  endDate?: string;
  startTag?: string;
  endTag?: string;
  baseBranch?: string;
  compareBranch?: string;
  commitCount?: number;
  adoProject?: string;
  adoOrg?: string;
  startPipelineId?: number;
  endPipelineId?: number;
  enableAI: boolean;
  aiFeatures?: {
    categorize: boolean;
    summarize: boolean;
    detectBreaking: boolean;
  };
}

export interface Commit {
  hash: string;
  author: string;
  date: string;
  message: string;
  body?: string;
}

export interface Contributor {
  name: string;
  email: string;
  count: number;
}

export interface ReleaseNotes {
  title: string;
  dateRange: string;
  commits: Commit[];
  contributors: Contributor[];
  categorized?: {
    features: Commit[];
    fixes: Commit[];
    breaking: Commit[];
    other: Commit[];
  };
  summary?: string;
}

export interface Pipeline {
  id: number;
  name: string;
  buildNumber: string;
  finishTime: string;
  result: string;
}

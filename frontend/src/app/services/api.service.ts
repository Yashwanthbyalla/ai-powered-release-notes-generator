import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReleaseNotesOptions, ReleaseNotes, Pipeline } from '../models/release-notes.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  generateReleaseNotes(options: ReleaseNotesOptions): Observable<ReleaseNotes> {
    return this.http.post<ReleaseNotes>(`${this.baseUrl}/generate`, options);
  }

  getTags(repoPath: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/git/tags?repoPath=${encodeURIComponent(repoPath)}`);
  }

  getBranches(repoPath: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/git/branches?repoPath=${encodeURIComponent(repoPath)}`);
  }

  getPipelines(project: string, orgUrl: string, token: string): Observable<Pipeline[]> {
    return this.http.get<Pipeline[]>(
      `${this.baseUrl}/ado/pipelines?project=${project}&orgUrl=${encodeURIComponent(orgUrl)}&token=${token}`
    );
  }

  checkOllamaStatus(): Observable<{ connected: boolean }> {
    return this.http.get<{ connected: boolean }>(`${this.baseUrl}/ollama/status`);
  }
}

import * as azdev from 'azure-devops-node-api';
import { Pipeline } from '../types';

export class AdoService {
  private connection: azdev.WebApi | null = null;

  async connect(orgUrl: string, token: string) {
    const authHandler = azdev.getPersonalAccessTokenHandler(token);
    this.connection = new azdev.WebApi(orgUrl, authHandler);
  }

  async getPipelines(project: string): Promise<Pipeline[]> {
    if (!this.connection) throw new Error('Not connected to ADO');
    
    const buildApi = await this.connection.getBuildApi();
    const builds = await buildApi.getBuilds(project, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 50);
    
    return builds.map(build => ({
      id: build.id!,
      name: build.definition?.name || '',
      buildNumber: build.buildNumber || '',
      finishTime: build.finishTime?.toISOString() || '',
      result: build.result?.toString() || ''
    }));
  }

  async getPRsBetweenBuilds(project: string, startBuildId: number, endBuildId: number): Promise<any[]> {
    if (!this.connection) throw new Error('Not connected to ADO');
    
    const buildApi = await this.connection.getBuildApi();
    const gitApi = await this.connection.getGitApi();
    
    const startBuild = await buildApi.getBuild(project, startBuildId);
    const endBuild = await buildApi.getBuild(project, endBuildId);
    
    if (!startBuild.sourceVersion || !endBuild.sourceVersion) {
      return [];
    }

    const repos = await gitApi.getRepositories(project);
    if (repos.length === 0) return [];

    const prs = await gitApi.getPullRequests(
      repos[0].id!,
      { status: 4 }, // Completed
      project
    );

    return prs
      .filter(pr => {
        const mergeDate = new Date(pr.closedDate!);
        const startDate = new Date(startBuild.finishTime!);
        const endDate = new Date(endBuild.finishTime!);
        return mergeDate >= startDate && mergeDate <= endDate;
      })
      .map(pr => ({
        id: pr.pullRequestId,
        title: pr.title,
        description: pr.description,
        author: pr.createdBy?.displayName,
        mergedDate: pr.closedDate
      }));
  }
}

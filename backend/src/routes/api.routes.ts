import { Router, Request, Response } from 'express';
import { ReleaseNotesService } from '../services/release-notes.service';
import { GitService } from '../services/git.service';
import { AdoService } from '../services/ado.service';
import { OllamaService } from '../services/ollama.service';

const router = Router();
const releaseNotesService = new ReleaseNotesService();

router.post('/generate', async (req: Request, res: Response) => {
  try {
    console.log('Generate request:', req.body);
    const releaseNotes = await releaseNotesService.generate(req.body);
    res.json(releaseNotes);
  } catch (error: any) {
    console.error('Generate error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/git/tags', async (req: Request, res: Response) => {
  try {
    const { repoPath } = req.query;
    let actualRepoPath = repoPath as string;
    let tempDir: string | null = null;
    
    // If it's an ADO URL, clone it first
    if (actualRepoPath.includes('dev.azure.com')) {
      const releaseNotesService = new ReleaseNotesService();
      tempDir = await releaseNotesService.cloneAdoRepo(actualRepoPath);
      actualRepoPath = tempDir;
    }
    
    const gitService = new GitService(actualRepoPath);
    const tags = await gitService.getTags();
    
    // Cleanup temp directory if created
    if (tempDir) {
      const releaseNotesService = new ReleaseNotesService();
      await releaseNotesService.cleanupTempDir(tempDir);
    }
    
    res.json(tags);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/git/branches', async (req: Request, res: Response) => {
  try {
    const { repoPath } = req.query;
    let actualRepoPath = repoPath as string;
    let tempDir: string | null = null;
    
    // If it's an ADO URL, clone it first
    if (actualRepoPath.includes('dev.azure.com')) {
      const releaseNotesService = new ReleaseNotesService();
      tempDir = await releaseNotesService.cloneAdoRepo(actualRepoPath);
      actualRepoPath = tempDir;
    }
    
    const gitService = new GitService(actualRepoPath);
    const branches = await gitService.getBranches();
    
    // Cleanup temp directory if created
    if (tempDir) {
      const releaseNotesService = new ReleaseNotesService();
      await releaseNotesService.cleanupTempDir(tempDir);
    }
    
    res.json(branches);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/ado/connect', async (req: Request, res: Response) => {
  try {
    const { orgUrl, token } = req.body;
    const adoService = new AdoService();
    await adoService.connect(orgUrl, token);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/ado/pipelines', async (req: Request, res: Response) => {
  try {
    const { project, orgUrl, token } = req.query;
    const adoService = new AdoService();
    await adoService.connect(orgUrl as string, token as string);
    const pipelines = await adoService.getPipelines(project as string);
    res.json(pipelines);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/ollama/status', async (req: Request, res: Response) => {
  try {
    const ollamaService = new OllamaService();
    const isConnected = await ollamaService.checkConnection();
    res.json({ connected: isConnected });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

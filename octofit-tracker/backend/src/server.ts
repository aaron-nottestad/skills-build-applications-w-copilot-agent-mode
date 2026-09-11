import express from 'express';
import './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', apiBaseUrl });
});

const collectionRoutes = [
  ['/api/users/', User],
  ['/api/teams/', Team],
  ['/api/activities/', Activity],
  ['/api/leaderboard/', Leaderboard],
  ['/api/workouts/', Workout],
] as const;

for (const [path, model] of collectionRoutes) {
  app.get(path, async (_request, response) => {
    if (model.db.readyState !== 1) {
      response.json({ data: [] });
      return;
    }

    const documents = await model.find().lean();
    response.json({ data: documents });
  });
}

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});


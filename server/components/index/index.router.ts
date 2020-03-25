import { Router } from 'express';
import config from 'config';

export const router = Router();

router.get('/', (req, res) => {
  res.json({ title: config.get('app.name') });
});

router.get('/ping', (req, res) => {
  res.json({ pong: true });
});

import express from 'express';
import { router } from '~/router';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

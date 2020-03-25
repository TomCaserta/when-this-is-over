import { router as index } from "~/components/index/index.router";
import { Router } from 'express';

export const router = Router();

router.use('/', index);

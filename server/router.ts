import { router as index } from '~/components/index/index.router';
import { router as user } from '~/components/user/user.router';
import { Router } from 'express';

export const router = Router();

router.use('/', index);
router.use('/users', user);

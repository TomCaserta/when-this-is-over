import { router as index } from '~/components/index/index.router';
import { router as user } from '~/components/user/user.router';
import { router as autocomplete } from '~/components/autocomplete/autocomplete.router';
import { Router } from 'express';

export const router = Router();

router.use('/', index);
router.use('/users', user);
router.use('/autocomplete', autocomplete);

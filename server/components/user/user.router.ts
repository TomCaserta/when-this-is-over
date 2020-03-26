import UserController from '~/components/user/user.controller';
import { Router } from 'express';

export const router = Router();

router.post('/login', UserController.login);

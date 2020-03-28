import AutoCompleteController from '~/components/autocomplete/autocomplete.controller';
import { Router } from 'express';

export const router = Router();

router.post('/place', AutoCompleteController.place);

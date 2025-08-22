import authRouter from './auth.js';
import contactRouter from './contacts.js';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/contacts', contactRouter);

export default router;

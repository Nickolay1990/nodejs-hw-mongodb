import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerValidationSchema } from '../validation/register.js';
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  sendResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { loginValidationSchema } from '../validation/login.js';
import { sendResetEmailValidationSchema } from '../validation/sendResetEmail.js';
import { resetPasswordValidationjs } from '../validation/resetPasswordValidation.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerValidationSchema),
  registerController,
);

authRouter.post('/login', validateBody(loginValidationSchema), loginController);

authRouter.post('/refresh', refreshController);

authRouter.post('/logout', logoutController);

authRouter.post(
  '/send-reset-email',
  validateBody(sendResetEmailValidationSchema),
  sendResetEmailController,
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordValidationjs),
  resetPasswordController,
);

export default authRouter;

import express from 'express';
import { validateBody, schemas } from '../../../middleware/validator';
import authController from './auth.controller'; 
import { localStrategy, merchantLoginStrategy } from '../../../middleware/strategy';
export const authRouter = express.Router();

authRouter.route('/login').post(validateBody(schemas.loginSchema), localStrategy, authController.login);
authRouter.route('/register').post( validateBody(schemas.registerSchema),  authController.register);
authRouter.route('/merchantLogin').post(validateBody(schemas.loginSchema), merchantLoginStrategy, authController.merchantLogin);
authRouter.route('/merchantRegister').post(validateBody(schemas.registerSchema),  authController.merchantRegister);
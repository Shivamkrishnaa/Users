import express from 'express';
import authController from './auth.controller'; 
export const authRouter = express.Router();

authRouter.route('/login').get(authController.login)
import express from 'express';
import { userRouter } from './resources/user';
import { authRouter } from './resources/auth';
export const restRouter = express.Router();

restRouter.use('/auth', authRouter);
restRouter.use('/user', userRouter);

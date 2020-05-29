import express from 'express';
import { authRouter } from './resources/auth';
import { reportRouter } from './resources/report';
export const restRouter = express.Router();
restRouter.use('/auth', authRouter);
restRouter.use('/report', reportRouter);
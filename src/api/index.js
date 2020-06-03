import express from 'express';
import { userRouter } from './resources/user';
import { authRouter } from './resources/auth';
import { itemRouter } from './resources/item';
import { orderRouter } from './resources/order';

export const restRouter = express.Router();

restRouter.use('/auth', authRouter);
restRouter.use('/user', userRouter);
restRouter.use('/item', itemRouter);
restRouter.use('/order', orderRouter);

import express from 'express'
import { userRouter } from './resources/modules/user';
export const webRouter = express.Router();
webRouter.use('/',[
    userRouter
])
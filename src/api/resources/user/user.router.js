import express  from 'express';
import userController from './user.controller';
export const userRouter = express.Router();

userRouter.route('/').get( userController.index);
userRouter.route('/').post( userController.create);
userRouter.get('/:name', userController.get);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.remove);
import express  from 'express';
import userController from './user.controller';
export const userRouter = express.Router();

userRouter.route('/').get( userController.index);
userRouter.route('/').post( userController.create);
userRouter.get('/:id', userController.get);
userRouter.post('/:id', userController.update);
userRouter.delete('/:id', userController.remove);
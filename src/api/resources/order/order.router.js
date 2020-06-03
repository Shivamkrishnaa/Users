import orderController from './order.controller';
import express from 'express';
import { jwtStrategy } from './../../../middleware/strategy';
import { validateBody, schemas } from './../../../middleware/validator'
export const orderRouter = express.Router();

orderRouter.route('/').get(  jwtStrategy, orderController.index);
orderRouter.route('/:id').get(  jwtStrategy, orderController.fetchById);
orderRouter.route('/').post( validateBody( schemas.orderCreate ), jwtStrategy, orderController.create);

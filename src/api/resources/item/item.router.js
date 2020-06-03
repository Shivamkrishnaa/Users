import itemController from './item.controller';
import express from 'express';
import { jwtStrategy } from './../../../middleware/strategy';
import { validateBody, schemas } from './../../../middleware/validator'
export const itemRouter = express.Router();

itemRouter.route('/').get(  jwtStrategy, itemController.index);
itemRouter.route('/').post( validateBody( schemas.itemCreate ), jwtStrategy, itemController.create);
itemRouter.route('/:id').patch( validateBody( schemas.itemUpdate ), jwtStrategy, itemController.update);
itemRouter.route('/:id').get(  jwtStrategy, itemController.fetchById);
itemRouter.route('/:id').delete(  jwtStrategy, itemController.delete);
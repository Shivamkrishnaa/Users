import express from 'express';
import  reportController from './report.controller';
export const reportRouter = express.Router();

reportRouter.route('/').post( reportController.index );
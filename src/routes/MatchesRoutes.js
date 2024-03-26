import { Router } from 'express';
import { ApiController } from '../controllers/ApiController.js';

const apiController = new ApiController();
export const matchesRoutes = Router();

matchesRoutes.get('/daily_matches', apiController.getDailyMatches);
matchesRoutes.get('/matches/:date', apiController.getSpecificMatch);

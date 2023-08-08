import { Router } from 'express';
import { userStatsController } from './userStatsController'; // Import your controller

const router = Router();

router.get('/collection-counts', userStatsController);

export const adminStats= router;

// OwnerStats.routes.ts

import { Router } from 'express';
import { ownerStatsController } from './OwnerStats.controller';

const router = Router();

router.get('/owner-collection-counts/:id', ownerStatsController);

export const ownerStatsRoutes = router;

import express from 'express';

import user from './user';

import { API_ENDPOINTS } from './utils/constants';

// Creating a new Express router
const router = express.Router();

// Mounting the user routes
router.use(API_ENDPOINTS.USER.INDEX, user);

export default router;

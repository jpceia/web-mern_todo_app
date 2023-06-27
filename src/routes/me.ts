import { Router } from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import { getMe } from '../controllers/me';

const routes = Router();
routes.get('/', isAuthenticated, getMe);

export default routes;

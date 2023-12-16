import { Router } from 'express';
import usersRoutes from '../users/users.routes';

const router = new (Router as any)();

router.use('/', usersRoutes);

export default router;

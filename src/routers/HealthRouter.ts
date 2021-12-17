import { Router } from 'express';
import { GetHealthRoute } from '../controllers/health.controller';

const getHealthRouter = (): Router => {
    const router = Router();

    router.get('/', GetHealthRoute);

    return router;
};

export default getHealthRouter;

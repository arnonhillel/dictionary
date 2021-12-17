import { wordsController } from 'controllers/words.controller';
import { Router } from 'express';
import { GetHealthRoute } from '../controllers/health.controller';

const getWordsRouter = (): Router => {
    const router = Router();

    router.post('/', wordsController.createWord);
    router.get('/', wordsController.getWord);

    return router;
};

export default getWordsRouter;

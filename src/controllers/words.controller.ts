import { HttpErrorMsg } from '../constants';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DictionaryType, SearchWordModel } from 'models/dictionary.models';
import { wordsService } from 'services/words.service';

class WordsController {

    createWord = async (request: Request, response: Response): Promise<void> => {
        const word = request.body as DictionaryType;
        try {
            const result = await wordsService.createWord(word)

            response.status(StatusCodes.OK).send(result);
            return;
        } catch (error) {
            console.error(error);
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(HttpErrorMsg.INTERNAL_ERROR);
            return;
        }
    };


    getWord = async (request: Request, response: Response): Promise<void> => {
        console.log(request.query);

        const { from, word, language } = request.query;
        if (!word || !from || !language) {
            response.status(StatusCodes.BAD_REQUEST).send(StatusCodes.BAD_REQUEST);
            return;
        }
        try {
            const result = await wordsService.getWord(this.normalizeText(from), this.normalizeText(word), this.normalizeText(language))
            response.status(StatusCodes.OK).send(result);
            return;
        } catch (error) {
            console.error(error);
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(HttpErrorMsg.INTERNAL_ERROR);
            return;
        }
    };

    normalizeText = (text: any) => {
        return text.toLocaleString().toLowerCase()
    };
}




export const wordsController = new WordsController();

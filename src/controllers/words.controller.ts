import { HttpErrorMsg } from '../constants';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DictionaryType, TranslatorType } from 'models/dictionary.models';
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

        const { source, word, target } = request.query;
        if (!word || !source || !target) {
            response.status(StatusCodes.BAD_REQUEST).send(StatusCodes.BAD_REQUEST);
            return;
        }

        const translateRequest: TranslatorType = {
            source: this.normalizeText(source),
            word: this.normalizeText(word),
            target: this.normalizeText(target)
        }

        try {
            const result = await wordsService.getWord(translateRequest)
            response.status(StatusCodes.OK).send(result);
            return;
        } catch (error) {
            console.error(error);
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(HttpErrorMsg.INTERNAL_ERROR);
            return;
        }
    };

    normalizeText = (text: any) => {
        return text.toLowerCase()
    };
}




export const wordsController = new WordsController();

import to from 'await-to-js';
import { connectDB } from 'db/ClientDB';
import { DictionaryType, TranslatorType } from 'models/dictionary.models';
import { Word } from "../db/db.models";
import { HttpErrorMsg } from '../constants';


class WordsService {

    createWord = async (word: DictionaryType) => {
        const [errorConnection, connection] = await to(connectDB(global.configuration));

        if (errorConnection) {
            throw new Error('failed to create word');
        }

        if (connection) {
            const newText = new Word({
                en: this.normalizeText(word.en),
                he: this.normalizeText(word.he),
            })
            newText.save(err => {
                if (err) {
                    console.error(err);
                    throw new Error(`${HttpErrorMsg.ERROR_WHILE_SAVING_NEW_ITEM}`);
                }
                console.log(`word has been created`)
            })

            return newText;
        }

        throw new Error(HttpErrorMsg.ERROR_WHILE_SAVING_NEW_ITEM);
    };



    getWord = async (translateRequest: TranslatorType) => {
        const [errorConnection, connection] = await to(connectDB(global.configuration));

        if (errorConnection) {
            throw new Error('failed to get word');
        }

        if (connection) {
            const filter = { [translateRequest.source]: translateRequest.word }
            const include = { [translateRequest.target]: 1 }
            const result = await Word.find(filter, include).exec();
            console.log(`Success translate from ${translateRequest.source} into ${translateRequest.target}`, result);
            return result;

        }

        throw new Error(HttpErrorMsg.INTERNAL_ERROR);
    };

    normalizeText = (text: any) => {
        return text.toLocaleString().toLowerCase()
    };
}




export const wordsService = new WordsService();

import { DictionaryType } from 'models/dictionary.models';
import mongoose, { Schema } from 'mongoose';

const WordSchema = new Schema(
    {
        en: { type: Schema.Types.String },
        he: { type: Schema.Types.String },
    },
    { versionKey: false }
);


export const Word = mongoose.model<DictionaryType>('Word', WordSchema);
import { normalize, schema } from 'normalizr';

const journalEntity = new schema.Entity("journals", { entries: [entryEntity] }, { idAttribute: '_id' });


const revisionEntity = new schema.Entity("entryRevisions", { }, { idAttribute: "_id" })
const entryEntity = new schema.Entity("entries", { revisions: [revisionEntity]}, { idAttribute: "_id" })


const userEntity = new schema.Entity("users", { journals: [journalEntity] }, { idAttribute: '_id' });



export const normalizeUser = (data) => normalize(data, userEntity);

export const normalizeJournal = (data) => normalize(data, journalEntity)
export const normalizeEntry = (data) => {
    console.log('data')
    console.log(data);
    return normalize(data, entryEntity)
};
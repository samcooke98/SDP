import Journal from "../models/journal.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";
import * as EntryController from "./EntryController.js"
/**
 * Helper function that creates and saves a new journal.
 * @param {String} title 
 * @param {*} colour 
 * @returns The created Journal Object
 */
export async function createJournal(title, colour) {
    var journal = new Journal({ title, colour });
    await journal.save();
    return journal;
}


export async function createEntry(title, content, journalObj) {
    var entry = await EntryController.createEntry(title, content);

    journalObj.entries.push(entry._id);

    journalObj.save();

    return journalObj;

}

export async function getByID(id) {
    return await Journal.findById(id);
}

export async function setArchived(id, isArchived = null) {
    var journal = await getByID(id);
    if (!isArchived) return journal;

    journal.isArchived = isArchived;
    return await journal.save();
}

export async function setColour( id, colour = null) { 
    let journal = await getByID(id);
    if(!colour) return journal;

    journal.colour = colour; 
    return await journal.save();

}
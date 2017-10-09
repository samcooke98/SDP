import Entry from "../models/entry.js";
import Journal from "../models/journal.js";
import q from "q";
import * as EntryContentController from "./entryContentController.js";


export async function getJournalID(entryID) {
    try {
        const journal = await Journal.find({entries: {$in: [entryID] }})
        return journal._id;
    } catch (error) {
        return null;        
    }
}


export async function createEntry(title, content) {
    var entry = new Entry();
    var content = await EntryContentController.createEntryContent(title, content);

    entry.revisions.push(content._id);

    await entry.save();
    return await entry.populate("revisions").execPopulate();
}

export async function reviseEntry(entryID, title, content) {
    let entry = await getByID(entryID);
    console.log(entryID);

    if (!entry)
        return { error: "Invalid entry id" }
    var newContent = await EntryContentController.createEntryContent(title, content);
    console.log("HERE");
    entry.revisions.push(newContent._id);

    entry = await entry.save();
    return await entry.populate("revisions").execPopulate();
}

export async function getByID(id) {
    return await Entry.findOne({ _id: id });
}

export async function getPopulated(id) {
    var entry = await Entry.findById(id);
    return await entry.populate("revisions").execPopulate();
}

export async function setHidden(id, hidden = null) {
    if (hidden == null) return getPopulated(id);
    var entry = await Entry.findByIdAndUpdate(id, { isHidden: hidden });
    return entry;
}

export async function setDeleted(id, deleted = null) {
    if (deleted == null) return getPopulated(id);
    var entry = await Entry.findByIdAndUpdate(id, { isDeleted: deleted });
    return entry;
}

export function modifyEntry(id, deleted, hidden) {
    const deferred = q.defer();
    Entry.findByIdAndUpdate(id, { $set: { isDeleted: deleted, isHidden: hidden } }, { new: true }, (err, entry) => {
        if (err) deferred.reject(err);
        console.log("---");
        console.log(entry);
        console.log("---");
        deferred.resolve(entry);
    })
    return deferred.promise;
}
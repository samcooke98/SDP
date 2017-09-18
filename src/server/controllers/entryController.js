import Entry from "../models/entry.js";

import * as EntryContentController from "./entryContentController.js";

export async function createEntry(title, content) {
    var entry = new Entry();
    var content = await EntryContentController.createEntryContent(title, content);

    entry.revisions.push(content._id);

    await entry.save();
    return entry;
}

export async function reviseEntry(entryID, title, content) {
    let entry = await getByID(entryID);

    var newContent = await EntryContentController.createEntryContent(title, content);
    entry.revisions.push(newContent._id);

    entry = await entry.save();
    return entry
}

export async function getByID(id) {
    return await Entry.findById(id);
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
import EntryContent from "../models/entryContent.js";
import Entry from "../models/entry.js";

export async function createEntryContent( title, content ) { 
    var content = new EntryContent({title, content});
    content = await content.save();
    console.log('here');
    return content; 
}

export async function getById( id ) {
    return EntryContent.findById(id);
}

export async function getEntryID ( revisionID ) { 
    try {
        const journal = await Entry.find({revisions: {$in: [revisionID] }})
        return journal[0]._id;
    } catch (error) {
        return null;        
    }
} 
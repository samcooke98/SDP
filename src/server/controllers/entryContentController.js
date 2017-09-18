import EntryContent from "../models/entryContent.js";


export async function createEntryContent( title, content ) { 
    var content = new EntryContent({title, content});
    content = await content.save();
    console.log('here');
    return content; 
}

export async function getById( id ) {
    return EntryContent.findById(id);
}
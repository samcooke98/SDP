import {Schema} from "mongoose";
var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');

var Entry = new Schema({
    createdTime: {type: Date, default: Date.now},
    isHidden: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false},
    revisions: [
        {
            type: Schema.ObjectId, 
            ref: "EntryContent"
        }
    ] //TODO: Insertion should be limited to only the end of the array (or start) 
});

export default mongoose.model("Entry", Entry);
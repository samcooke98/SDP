import {Schema, model} from "mongoose";
var mongoose = require('mongoose');
import moment from "moment";
var passportLocalMongoose = require('passport-local-mongoose');

var EntryContent = new Schema({
    title: { type: String, required: true    },
    content: { type: String, required: true },
    createdAt: { type: Date, default: moment.utc } 
});

export default mongoose.model("EntryContent", EntryContent);
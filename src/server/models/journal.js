import {Schema} from "mongoose";
var mongoose = require('mongoose');

const validateColour = ( string ) => {
    //Expect a hexadecimal
    // todo
    return true;
}

var Journal = new Schema({
    title: { type: String, required: true}, 
    isArchived: { type: Boolean, default:false},
    colour: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    entries: [{type: Schema.ObjectId, ref: "Entry"}]
});

export default mongoose.model('Journal', Journal);
import User from "../models/user.js";
import { sendError, sendPayload } from "../utils/apiResponse.js";

import passport from "passport";
import moment from "moment";

import * as JournalController from "./journalController.js";

/**
 * Creates a user and team 
 * @param {*} req 
 * @param {*} res 
 * Expects username, password, firstName, lastName, teamName, description, category in the body of the request
 */
export function registerUser(req, res) {
    console.log( req.body ); 
    let username = req.body.username;
    let name = req.body.name
    let password = req.body.password
    let newUser = new User({ username, name });
    User.register(newUser, req.body.password, function (err, account) {
        console.log(err);
        if  (err) {
            res.json(sendError(err));
            return;
        }
        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json(sendError("Internal Server Error"));
                    return;
                } else {
                    res.json(sendPayload(newUser));
                    return;
                }
            });
        });
    });
}



export async function createJournal(title, colour, user) {
    var journal = await JournalController.createJournal(title, colour);

    //Save the new Journal to the user document
    user.journals.push(journal._id);
    await user.save();
    return await populate(user);
}


export async function getUserByID( id ) { return await User.findById(id) }

export async function populate(userObj) { 
    return userObj.populate('journals').execPopulate();
}
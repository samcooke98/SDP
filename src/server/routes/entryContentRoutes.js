import { Router } from 'express';
import { sendError, sendPayload } from "../utils/apiResponse.js";
import { isLoggedIn } from "../utils/request.js";

import { getJournalID } from "../controllers/entryController.js";
import * as EntryContentController from "../controllers/entryContentController";

let router = new Router();

const isPermitted = async (req, res, next) => {
    const revisionID = req.params.id;
    try {
        const entryID = await EntryContentController.getEntryID(revisionID);
        const journalID = await getJournalID(entryID);
        console.log(req.user);
        if(req.user.journals.indexOf( journalID ) == -1) {
            res.json( sendError("You don't have permission to do that"))
        } else { 
            next();
        }
    } catch (err) {
        console.log(err);
        res.json( sendError("You don't have permission to do that"))        
    }
}


router.get("/revision/:id", isLoggedIn, isPermitted, async (req, res) => {
    try {
        res.json(sendPayload(await EntryContentController.getById(req.params.id)))
    } catch (err) {
        console.log(err);
        res.json(sendError(err))
    }
})


export default router;
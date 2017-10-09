import { Router } from 'express';
import { sendError, sendPayload } from "../utils/apiResponse.js";
import { isLoggedIn } from "../utils/request.js";


import * as EntryController from "../controllers/entryController.js";

let router = new Router();

const isPermitted = (req, res, next) => {
    const entryID = req.params.id;
    const userID = req.user._id;

    const journal = EntryController.getJournalID(entryID);
    UserController.getUserByID(userID).then((userObj) => {
        if (userObj.journals.indexOf(journalID) == -1) {
            res.json(sendError("You aren't authorised to do that"));
        } else {
            next();
        }
    })
}


router.get("/entry/:id", isLoggedIn, isPermitted ,async (req, res) => {
    try {
        res.json(sendPayload(await EntryController.getPopulated(req.params.id)))
    } catch (err) {
        console.log(err);
        res.json(sendError(err))
    }
})

router.put("/entry/:id", isLoggedIn, isPermitted, async (req, res) => {
    try {
        console.log(req.body);
        console.log(await EntryController.getByID(req.params.id));

        let result;
        result = EntryController.modifyEntry(req.params.id, req.body.isDeleted, req.body.isHidden);
        console.log(result);
        result.then((updatedEntry) => {
            console.log("Updated Entry: ");
            console.log(updatedEntry);
            res.json(sendPayload(updatedEntry));
        })
    } catch (err) {
        console.log(err);
        res.json(sendError(err));
    }
})
//Create a new revision
router.post("/entry/:entryID/revision", isLoggedIn, isPermitted, async (req, res) => {
    try {
        res.json(sendPayload(
            await EntryController.reviseEntry(req.params.entryID, req.body.title, req.body.content)
        ));
    } catch (err) {
        console.log(err);
        res.json(sendError(err));
    }
})

export default router;
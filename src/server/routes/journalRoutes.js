import { Router } from 'express';
import { sendError, sendPayload } from "../utils/apiResponse.js";
import * as JournalController from "../controllers/journalController";
let router = new Router();

import { isLoggedIn } from "../utils/request.js";


//Create entry
router.post("/journal/:id/entry", isLoggedIn, async (req, res) => {
    try {
        var journalObj = await JournalController.getByID(req.params.id);
        var entry = await JournalController.createEntry(req.body.title, req.body.content, journalObj);
        res.json(sendPayload(entry));
    } catch (err) {
        res.json(sendError(err));
    }
})
//Get entries for journal
router.get("/journal/:id/entry", isLoggedIn, async (req, res) => {
    try {
        var journalObj = await JournalController.getByID(req.params.id);
        var result = await journalObj.populate('entries').execPopulate();
        res.json(sendPayload(result))
    } catch (err) { 
        res.json(sendError(err));
    }
})

router.get("/journal/:id", isLoggedIn, async(req,res) => { 
    try { 
        let result = await JournalController.getByID(req.params.id);
        res.json(sendPayload(result))
    } catch (err) { 
        console.log(err);
        res.json(sendError(err))

    }
})

//Update Journal
router.put("/journal/:id", isLoggedIn, async (req,res) => { 
    let id = req.params.id; 
    try{ 
        let result = await JournalController.setArchived(id, req.body.archive || null);
        result = JournalController.setColour(id, req.body.colour || null );
        res.json(sendPayload(result))
    } catch (err) { 
        console.log(err);
        res.json(sendError(err));
    }
})


export default router;
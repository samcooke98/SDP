import { Router } from 'express';
import { sendError, sendPayload } from "../utils/apiResponse.js";
import { isLoggedIn } from "../utils/request.js";


import * as EntryController from "../controllers/entryController.js";

let router = new Router();


router.get("/entry/:id", isLoggedIn, async (req, res) => {
    try {
        res.json(sendPayload(await EntryController.getPopulated(req.params.id))) 
    } catch (err) {
        console.log(err);
        res.json(sendError(err))
    }
})

router.put("/entry/:id", isLoggedIn, async (req,res) => { 
    try { 
        await EntryController.setDeleted(req.params.id, req.body.isDeleted);
        var result = await EntryController.setHidden(req.params.id, req.body.isHidden);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(sendError(err));
    }
})
//Create a new revision
router.post("/entry/:entryID/revision", async(req,res) => { 
    try { 
        res.json( sendPayload( 
            await EntryController.reviseEntry(req.params.entryID, req.body.title, req.body.content)
        ));
    }catch(err) { 
        console.log(err);
        res.json(sendError(err));
    }
})

export default router;
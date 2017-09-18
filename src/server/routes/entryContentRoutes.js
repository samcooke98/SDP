import { Router } from 'express';
import { sendError, sendPayload } from "../utils/apiResponse.js";
import { isLoggedIn } from "../utils/request.js";


import * as EntryContentController from "../controllers/entryContentController";

let router = new Router();


router.get("/revision/:id", isLoggedIn, async (req, res) => {
    try {
        res.json(sendPayload(await EntryContentController.getById(req.params.id))) 
    } catch (err) {
        console.log(err);
        res.json(sendError(err))
    }
})


export default router;
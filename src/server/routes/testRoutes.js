import entry from "../models/entry";
import entryContent from "../models/entryContent";
import journal from "../models/journal";
import user from "../models/user.js";

import { Router } from "express";
const router = new Router();

router.get("/test-reset", async (req, res, next) => {
    if (process.env.NODE_ENV == "test") {
        await entry.remove({});
        await entryContent.remove({});
        await journal.remove({});
        await user.remove({});
        res.json({success: true, payload: "Cleared DB"})
    } else {
        console.log("Somebody tried to get to the test-reset route");
        next();
    }
})




export default router;

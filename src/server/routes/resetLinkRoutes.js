// import * as ResetLinkController from "../controllers/ResetLinkController.js";
import {Router } from "express";

var router = Router();


// router.post('/reset', function (req, res) {
//     ResetLinkController.createLink(30, req.body.username)
//     res.json(sendPayload("ConditionallySent"));
// });

// router.post('/reset/confirmAction', function(req, res) {
//     //Put new password into the db
//     ResetLinkController.changePassword(req.body.RID,req.body.password,res)
// });

export default router;
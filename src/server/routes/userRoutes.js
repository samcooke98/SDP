import passport from 'passport';
import { Router } from "express";
var router = Router();

import * as UserController from "../controllers/userController.js";
import { isLoggedIn } from "../utils/request.js"

import { sendError, sendPayload } from "../utils/apiResponse.js";
import { ensureLoggedIn } from "connect-ensure-login"

const NYI = (req, res) => { res.json(sendError("NOT YET IMPLEMENTED")) }

router.post('/register', UserController.registerUser);

// Returns 401 on failure
router.post("/login", passport.authenticate('local'), (req, res) => {
    console.log(req.user);
    res.json(sendPayload(req.user))
})

router.get("/logout", (req, res) => {
    req.logout();
    res.json(sendPayload("success"))
})

router.get("/user", isLoggedIn, async (req, res) => {
    try {
        var user = await UserController.getUserByID(req.user._id);
        res.json(sendPayload(user));
    } catch (err) {
        res.json(sendError(err))
    }
})

/* Journal Creation */
router.post("/journal", isLoggedIn, async (req, res) => {
    try {
        var result = await UserController.createJournal(req.body.title, req.body.colour, req.user);
        console.log(result);
        res.json((result));
    } catch (err) {
        console.log(err);
        res.json(sendError(JSON.stringify(err.message)))
    }
})

router.delete("/jounal/:id", isLoggedIn, NYI)



module.exports = router;
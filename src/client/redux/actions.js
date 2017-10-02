/**
 * Action Creators
 */

/* It's a good idea to use Standard Flux Actions */
// https://github.com/acdlite/flux-standard-action
// https://github.com/reduxactions/redux-actions

import { createAction } from "redux-actions";
import { post, get, del, put } from "../utils/api.js";
import * as normalizr from "../utils/normalizr";
import * as actionTypes from "./actionTypes.js";


//Helper function. Give it a method to normalize, and the data. It will normalize if it should, or return raw data otherwise. 
const normalize = (normalizeFunc, data) => data.success
    ? ({ payload: normalizeFunc(data.payload), success: data.success })
    : ({ payload: data.payload, success: data.success });


//By naming the parameters after what the server expects, we can use shorthand syntax for object creation 
export const login = createAction(actionTypes.LOGIN, async (username, password) => {
    console.log(username, password);
    return post("login", { username: username, password: password }).then((val) => normalize(normalizr.normalizeUser, val))
})

export const getJournal = createAction(actionTypes.GET_JOURNAL, async (id) => {
    return get(`journal/${id}`).then((val) => normalize(normalizr.normalizeJournal, val))
})

export const getEntry = createAction(actionTypes.GET_ENTRY, async (id) =>
    get(`entry/${id}`).then((val) => normalize(normalizr.normalizeEntry, val))
)

export const createRevision = createAction(actionTypes.CREATE_REVISION, async (entryID, title, content) => {
    return post(`entry/${entryID}/revision`, { title, content }).then((val) => normalize(normalizr.normalizeEntry, val))
})

export const selectEntry = createAction(actionTypes.SELECT_ENTRY,
    (entryID, journalID) => ({
        journal: journalID,
        entryID: entryID
    }))

export const selectControl = createAction(actionTypes.SELECT_CONTROL, (control) => ({
    control
}))

export const createJournal = createAction(actionTypes.CREATE_JOURNAL, async (title, colour) =>
    post("journal", { title, colour }).then((val) => normalize(normalizr.normalizeUser, val))
)


export const createUser = createAction(actionTypes.REGISTER, async (name, username, password) => {
    return post("register", { username, name, password }).then((val) => normalize(normalizr.normalizeUser, val))
})

export const createEntry = createAction(actionTypes.CREATE_ENTRY, async (title, content, journalID) =>
    post(`journal/${journalID}/entry`, { title, content }).then((val) => normalize(normalizr.normalizeJournal, val))
)


export const getRevision = createAction(actionTypes.GET_REVISION, async (id) =>
    get(`revision/${id}`).then((val) => normalize(normalizr.normalizeRevision, val))
)

export const modifyEntry = createAction(actionTypes.MODIFY_ENTRY, async (id, isDeleted, isHidden) =>
    put(`entry/${id}`, { isDeleted: isDeleted, isHidden: isHidden }).then((val) => normalize(normalizr.normalizeEntry, val))
)

// export const getUserDetails = createAction(actionTypes.GET_USER, async () => {
//     return get("user").then( (val) => normalize(normalizr.normalizeUser, val ))
// })

// export const sendInvitations = createAction(actionTypes.SEND_INVITES, async (id, emails) => {
//     return post("invite", { id, emails })
// })

// export const getInviteInfo = createAction(actionTypes.GET_INVITE, async (id) => {
//     return get(`invite/${id}`).then((val) => normalize(normalizr.normalizeTeam, val))
//     //todo: normalize and store data as it possibly returns a team info
// })

// export const joinTeam = createAction(actionTypes.JOIN_TEAM, async (username, firstName, lastName, password, teamID) => {
//     return post(`invite/${teamID}`, { username, firstName, lastName, password }).then( (val) => normalize(normalizr.normalizeUser, val))
// })

// export const resetPass = createAction(actionTypes.RESET_PASS, async (username) => {
//     return post(`reset`, { username })
// })

// export const resetPassConfirm = createAction(actionTypes.RESET_PASS_CONFIRM, async (password, RID) => {
//     return post(`reset/confirmAction`, { RID, password })
// })

// export const comment = createAction(actionTypes.COMMENT, async (username, text, url) => {
//     return post(`${url}/comments`, { username, text, url})
// })

// export const createResource = createAction(actionTypes.CREATE_RESOURCE, async (url, title, description, teamID) => {
//     return post(`resource`, { url, title, description, team: teamID }).then(

        // (payload) => normalize( normalizr.normalizeResource, payload) 
        //This helper function replaces all the code below!
        // {
        //     if (payload.success)
        //         return {
        //             : payload.success,
        //             payload: normalizr.normalizeResource(payload.payload)
        //         }
        //     else
        //         return {
        //             success: payload.success,
        //             payload: payload.payload
//         //         }
//         // }
//     )
// })



// export const getResources = createAction(actionTypes.GET_RESOURCE, async (teamID) => {
//     return get(`resource?team=${teamID}`).then( 
//         (payload) => normalize( normalizr.normalizeResources, payload) 
//     )
// })

// export const deleteResource = createAction(actionTypes.DELETE_RESOURCE, async (resourceID) => {
//     return del( `resource/${resourceID}`);
// }, (resourceID) => ({ id: resourceID}) ) //Create a meta part, containing the resource that was deleted



//At some point, it could be cool to generate these at runtime? 
// const apiActions = [ 
//     {
//         endpoint: "login", 
//         actionString: "LOGIN", 
//         params: [ { }]

//     }
// ]


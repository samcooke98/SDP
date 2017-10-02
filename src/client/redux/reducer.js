/**
 * Reducers
 */
import { handleAction, handleActions } from "redux-actions"
import combineReducers from "redux"
import * as actionTypes from "./actionTypes.js";
import merge from "lodash/merge";

const initialState = {
    data: { //Entities are placed in here 
        users: {},
        journals: {},
        entries: {},
        entryRevisions: {}
    },
    ui: {
        journalEntry: {}
    }, //UI Data is placed here -> Like error messages for example
    misc: { // Anything that doesn't fit above can go here, (or in a new node if you want ) 
        loggedIn: false,
        controls: []

    },

}

/**
 * So this array maps action types to a onSuccess and onFail function. 
 * Entity Normalisation happens regardless, if there is an entity on the payload
 */
var functionalReducers = {
    [actionTypes.REGISTER]: {
        onSuccess: (state, action) => ({ //Success returns the same as login 
            ui: {
                ...state.ui,
                registrationSuccess: true,
                registrationFail: ""
            }
        }),
        onFail: (state, action) => ({
            ui: {
                ...state.ui,
                registrationFail: action.payload.payload,
                registrationSuccess: false,
            }
        }),
    },
    [actionTypes.GET_JOURNAL]: {
        onSuccess: (state, action) => state,
        onFail: (state, action) => state //TODO: Error handling
    },
    [actionTypes.SELECT_ENTRY]: {
        onSuccess: (state, { payload }) => ({ ...state, ui: { ...state.ui, journalEntry: { ...state.ui.journalEntry, [payload.journal]: payload.entryID } } }),
        onFail: (state, action) => { console.log("her") }
    },
    [actionTypes.SELECT_CONTROL]: {
        onSuccess: (state, { payload }) => ({ ...state, misc: { ...state.misc, controls: [...(state.misc.controls || []), payload.control] } })
    },
    [actionTypes.CREATE_JOURNAL]: {
        onSuccess: (state, { payload }) => ({

        })
    },
    [actionTypes.MODIFY_ENTRY]: { 
        onSuccess: (state, {payload}) => ({
        })
    }
}

export default function rootReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case actionTypes.LOGIN:
            return loginReducer(state, action)
            break;
        default:
            if (action.payload && action.payload.payload && action.payload.payload.entities) {
                state = merge({}, state, { data: action.payload.payload.entities })
                console.log("Merged");
            }
    }
    if (functionalReducers[action.type]) {
        state = createReducer(state, action, functionalReducers[action.type].onSuccess, functionalReducers[action.type].onFail);
    } else {
        console.log("unhandled redux action");
        console.log(action);
    }
    return state;
}




const createReducer = (state, action, onSuccess, onFail) =>
    (action.payload.success == false)
        ? { ...state, ...onFail(state, action) } //Error Handling
        : { ...state, ...mergeEntities(state, action), ...onSuccess(state, action) /* Add other properties here */ }



//Login is special, it actually raises the correct error 
const loginReducer = (state, action) => {
    let payload = action.payload.payload;
    console.log(action.payload);
    if (action.payload.success) {
        console.log('here');
        return { //ORDER is important. The spread operator does a shallow merge BUT it will overwrite. So call it first
            ...state,
            data: merge({}, state.data, payload.entities),
            misc: { ...state.misc, loggedIn: true, userID: payload.result },
        }
    } else {
        return {
            ...state,
            ui: { loginMsg: "Incorrect username or password" }

        }
    }
}

/**
 * Shortcut method to merge entities, returns a new object. 
 * @param {*} state 
 * @param {*} action 
 */
const mergeEntities = (state, action) =>
    (action.payload && action.payload.payload && action.payload.payload.entities)
        ? merge({}, state, { data: action.payload.payload.entities })
        : state

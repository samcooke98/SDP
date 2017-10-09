import configureMockStore from "redux-mock-store";
import thunk from "redux-promise";
import { isFSA } from 'flux-standard-action';

import * as actions from "../../redux/actions";
import * as types from "../../redux/actionTypes.js";

import nock from "nock"

describe( 'Actions', () => { 
    for(var action in actions) { 
        it(`Action: ${action} should be a flux-standard action`, () => { 
            expect(isFSA(actions[action]())).toBe(true);
        })
    }
})


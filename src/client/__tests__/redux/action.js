import configureMockStore from "redux-mock-store";
import thunk from "redux-promise";
import * as actions from "../../redux/actions";
import * as types from "../../redux/actionTypes.js";
import nock from "nock"

describe( 'Async Actions', () => { 
    afterEach(() => { nock.cleanAll() });

    test("Actions all have a type contained in the types folder", () => { 
        expect(1).toBe(1);
    })


})


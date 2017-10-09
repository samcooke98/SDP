import configureMockStore from 'redux-mock-store'
import promiseMiddleware from 'redux-promise';
import {applyMiddleware} from "redux"
import * as actions from '../../redux/actions.js'

import nock from 'nock';

const mockStore = configureMockStore(applyMiddleware(promiseMiddleware))

describe('Async actions', () => {
    afterEach(() => {
        nock.cleanAll();
    })

    it(" creates a loggedIn ", () => {
        nock('http://localhost:3000/')
            .post('/api/login')
            .reply(200, { body: { success: true, payload: { _id: "59cb7e908d44533e683cba85" } } })

        const store = mockStore({});


    })

})
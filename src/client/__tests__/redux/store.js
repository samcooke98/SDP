import configureMockStore from 'redux-mock-store'
import promiseMiddleware from 'redux-promise';

import * as actions from '../../actions/TodoActions'

import nock from 'nock';

const mockStore = configureMockStore(promiseMiddleware)

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
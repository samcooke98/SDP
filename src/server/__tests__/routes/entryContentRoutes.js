/**
 * @jest-environment node
 */
const fetch = require('fetch-everywhere');
let login = false;
import router from "../../routes/entryContentRoutes.js"
import express from 'express';

const app = express();


describe("/revision Routes", () => {
    let server, reqSpy;
    beforeAll(() => {
        app.use((req, res, next) => {
            // const spy = jest.spyOn(req, "user");
            // console.log(spy);
            return router(req, res, next)
        })

        app.use(require("body-parser").json())
        app.use(require("body-parser").urlencoded());
        server = app.listen(3001, () => {
            // console.log("Server is listening");
        })
    })

    afterAll(() => {
        server.close()
    })

    describe(" GET /revision/:id", () => {
        it("Should fail before we login", async () => {
            const data = await get('revision/abc')
            console.log(reqSpy);
            expect(data).toHaveProperty("success", false);
        })

        it("Should fail when we login (Invalid ID)", async () => {
            const data = await get('revision/abc');

            expect(data).toHaveProperty("success", false);
        })


        it("Should work when we login (Mocked: Valid ID) ", async () => {
            //TODO!
            jest.mock("../../utils/request.js", () => ({ isLoggedIn: (req, res, next) => next() }));

            const data = await get('revision/59cf50062fc6d3289877f404');

            expect(data).toHaveProperty("success", true);
        })
    })
})


const get = (endpoint) => fetch('http://localhost:3001/' + endpoint).then(response => response.json())
const post = (endpoint, payload) => fetch(`http://localhost:3001/${endpoint}`, { method: "POST", body: JSON.stringify(payload) }).then(response => response.json());





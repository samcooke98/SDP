/**
 * @jest-environment node
 */
const fetch = require('fetch-everywhere');
let login = false;
import router from "../../routes/entryContentRoutes.js"
import express from 'express';


/*
Routes: 
    /revision/:ID
*/
const app = express();
describe("/revision Routes", () => {
    beforeAll(() => {
        app.use(router);
        app.listen(3001, () => {
            // console.log("Server is listening");
        })
    })


    describe(" GET /revision/:id", () => {
        it("Should fail before we login", async () => {
            const data = await get('revision/abc')
            expect(data).toHaveProperty("success", false);
        })

        it("Should fail when we login (Invalid ID)", async () => {
            const userSpy = jest.spyOn("req", "user");
            const data = await get('revision/abc');
            
            expect(userSpy).toHaveBeenCalled();            
            expect(data).toHaveProperty("success", false);
        })
    })
})


const get = (endpoint) => fetch('http://localhost:3001/' + endpoint).then(response => response.json())
const post = (endpoint, payload) => fetch(`http://localhost:3001/${endpoint}`, { method: "POST", body: JSON.stringify(payload) }).then(response => response.json());



const mockRequest =  () => {
    return {
        isLoggedIn: jest.fn((req, res, next) => {
            next();
        })
    }
}

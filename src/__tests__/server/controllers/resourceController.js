// import * as ResourceController from "../../../server/controllers/resourceController.js"
// import mockingoose from 'mockingoose';

// const team = {
//     _id: "507f191e810c19729de860eb",
//     teamName: "Valid Team",
//     description:  "A Test Team",
//     category: "Business",
//     status: "Valid",
//     creationDate: Date.now(),
//     owner:  "507f191e810c19729de860ea",
// }

// const user = { 
//     _id: "507f191e810c19729de860ea",
//     username: "sam@samcooke.com.au",
//     firstName: "john",
//     lastName: "smith",
//     teams: [ "507f191e810c19729de860eb" ]
// }


// describe("Resource Controller", () => {
//     describe("Creation", () => {
//         test("Fails with invalid user", async () => {
//             mockingoose.Team.toReturn(team);
//             mockingoose.User.toReturn(user);
//             const data = await ResourceController.createResource(
//                 'http://google.com/', 'blah', 'description', 'userID', 'teamID'
//             )
//             console.log(data);
//             expect(1).toBe(2);



//         })

//     })
// })


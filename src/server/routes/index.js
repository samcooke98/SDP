//We're going to import all the routes from this folder
import UserManagementRoutes from "./userRoutes.js"
import journalRoutes from "./journalRoutes.js";
import entryRoutes from "./entryRoutes.js"
import entryContentRoutes from "./entryContentRoutes.js"
import testRoutes from "./testRoutes.js";
//WE're then going to export all the routes from this folder

export {
    UserManagementRoutes, 
    journalRoutes, 
    entryRoutes, 
    entryContentRoutes,
    testRoutes
};


//This should (hopefully) allow us to do hot module reloading with routes
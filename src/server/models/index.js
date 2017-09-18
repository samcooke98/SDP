//We're going to import all the routes from this folder
import UserManagementRoutes from "./userRoutes.js"
import ResetLinkRoutes from "./resetLinkRoutes.js";
//WE're then going to export all the routes from this folder

export {UserManagementRoutes, ResetLinkRoutes};


//This should (hopefully) allow us to do hot module reloading with routes
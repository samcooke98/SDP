# Scriptum
This system is built using a full javascript stack.
It requires a mongo databse 

## To Deploy 
Note: This assumes a mongo database is running
1. `yarn` - This install all dependencies to run the software 
2. Create a dotenv, or set environment variables to match any required configuration settings.
    Common Settings include, setting a mongo URI, and port number. 
3. To build for production, run `yarn run build` 
4. The built files will be outputted to ./build/ - If moving the files however, be aware that node_modules is required for the server to run. 
5. To start production, in this folder, run `yarn run start` 


## Additional Dependencies
This repository assumes you have the following applications
 * Yarn 
 * Node 
 * MongoDB 


## Configuration Options 
| Environment Variable | Default Value                      | 
| -------------------- | ---------------------------------- | 
| MONGO_URL            | mongodb://localhost:27017/scriptum |
| PORT                 | 3000                               | 


## Start dev with 
npm run dev 
React HMR will be run so as you edit react components they will update in real time. 

## Build Production
If you want to build production, run `npm run build` then `npm start` will start the production environment. 

## Development 
To develop, follow configuration. 
Run with `yarn run dev` 

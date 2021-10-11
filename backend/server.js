const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./database/database");

// Handle Uncaught Exception
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Sutting down the server due to Uncaught Exception`);
     process.exit(1);
}) 

// Config 
dotenv.config({path:"backend/config/.env"})

// Connecting database

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is rumming on localhost:${process.env.PORT}`);
})

// Unhandled promice Rejection

process.on("unhandledRejection",(err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Sutting down the server due to unhaandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})
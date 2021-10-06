const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./database/database");

// Config 
dotenv.config({path:"backend/config/.env"})

// Connecting database

connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`Server is rumming on localhost:${process.env.PORT}`);
})
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const errorMiddleWare = require("./middleware/error");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())


// Route Imports

const product = require("./routes/productRoot");
const user = require("./routes/userRoutes");
app.use("/api/v1",product);
app.use("/api/v1",user)

// Middleware for error
app.use(errorMiddleWare)


module.exports = app;
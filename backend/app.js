const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const errorMiddleWare = require("./middleware/error");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())


// Route Imports

const product = require("./routes/productRoot");
app.use("/api/v1",product);

// Middleware for error
app.use(errorMiddleWare)


module.exports = app;
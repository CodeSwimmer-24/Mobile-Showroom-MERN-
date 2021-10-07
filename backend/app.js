const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())
// Route Imports



const product = require("./routes/productRoot");
app.use("/api/v1",product)

module.exports = app;
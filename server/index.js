const express = require('express');

const app = express();

const PORT = 8000;
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

app.use(require("body-parser").json());
app.use(require("morgan")("dev"));



app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
});

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.listen(PORT, (err) => {
    if (!err){
        console.log(`listening on PORT ${PORT}` )
    }
    else{
        console.log(`something went wrong`)
    }
})
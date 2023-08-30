require("dotenv").config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const express = require('express');

const app = express();
const cors = require('cors')
const PORT = 8000;
const jwt = require("jsonwebtoken");
const path = require("path");


app.use(require("body-parser").json());
app.use(require("morgan")("dev"));
app.use(cors());

app.use((req, res, next) => {
    //Check if the authorization header is valid
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
    try{
      const { id } = jwt.verify(token, process.env.JWT);
      req.userId = id;
    }
    catch{
      req.userId = null;
    }
  
    next();
  });


app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
});

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.post('/api/saveDeliveryDetails', (req, res) => {
  
  console.log(req.body);

  
  res.json({ message: 'Details saved successfully' });
});

app.listen(PORT, (err) => {
    if (!err){
        console.log(`listening on PORT ${PORT}` )
    }
    else{
        console.log(`something went wrong`)
    }
})
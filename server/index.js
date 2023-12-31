require("dotenv").config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const express = require('express');

const app = express();
const cors = require('cors')
const PORT = 8000;
const jwt = require("jsonwebtoken");
const path = require("path");
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(require("body-parser").json());

const saveDeliveryDetails = require('./api/saveDeliveryDetails');
app.use('/api', saveDeliveryDetails);

const orderHistory = require('./api/orderHistory');
app.use('/api/orderHistory', orderHistory);


app.use(require("morgan")("dev"));
app.use(cors());

app.use((req, res, next) => {
    //Check if the authorization header is valid
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
    try{
      const decodedToken = jwt.verify(token, process.env.JWT);
      req.userId = decodedToken.id;
      req.admin = decodedToken.admin || false;
    }
    catch{
      req.userId = null;
      req.admin = false;
    }
  
    next();
  });
  app.post('/checkout', async (req, res) => {
    try {
        
        const { totalPrice } = req.body;
        const userId = req.session.userId; 
        const user = await prisma.user.findUnique({ where: { id: userId }, select: { cartId: true } });

        if (!user.cartId) {
            return res.status(400).send("User does not have an active cart");
        }
        await prisma.order.update({
            where: { id: user.cartId },
            data: { totalPrice }
        });

        res.status(200).send("Checkout successful!");
    } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
  });



app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.post('/saveDeliveryDetails', (req, res) => {
  
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
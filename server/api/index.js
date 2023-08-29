const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("You have reached the api router");
});

router.use("/ingredients", require("./Ingredients"));


module.exports = router;

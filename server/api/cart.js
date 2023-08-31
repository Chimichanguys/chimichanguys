const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { requireUser } = require("./idRequired");

router.put("/user", requireUser, async (req, res) => {
  const userId = req.userId;
  const cartId = req.body.cartId;
  console.log(cartId);
  await prisma.user.update({
    where: { id: userId },
    data: { cartId: cartId },
  });
  res.send({ cartId });
});

router.post('/create', async (req, res) => {
  try {
    const token = req.headers.authentication;
    // const userId = req.body.userId;
    const userId = req.userId;
    const chimichangas = req.body.chimichangaIds;
    
    if (token) {
      const newPost = await prisma.order.create({
        data: {
          userId,
          chimichangas
        },
      });
      res.send(newPost);
    } else {
      res.status(401).send("invalid authentication!");
    }
  } catch (err) {
    console.error(err);
  }
})


// prisma.order.findUnique({
//   where: {id: Number(req.params.id)},
//   include: {chimichangas: true}
// })

// prisma.order.findUnique({
//   where: {id: Number(req.params.id)},
//   include: {chimichangas: {
//     include: {ingredients: true}
//   }}
// })


module.exports = router;

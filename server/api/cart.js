const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { requireUser } = require("./idRequired");

router.put("/user", requireUser, async (req, res) => {
  const userId = req.userId;
  const cartId = req.body.cartId;
  await prisma.user.update({
    where: { id: userId },
    data: { cartId: cartId },
  });
  res.status(200).send({ cartId });
});

router.post("/", requireUser, async (req, res) => {
  const userId = req.userId;
  const ingredients = req.body.ingredients;
  const { cartId } = await prisma.user.findUnique({
    select: { cartId: true },
    where: { id: userId },
  });

  if (cartId) {
    // TODO: if userId has a cartId, add a chimichanga to the cart
    res.send(`Cart Id: ${cartId}`);
  } else if (cartId === null) {
    // TODO: if user does not have a cart, create a cart & add cartId to User table & add the chimichanga to the order
    res.send("no cart id");
  }

  router.delete("/", requireUser, async (req, res) => {
    const userId = req.userId;
    const chimichangaId = req.body.chimichanga;
    const { cartId } = await prisma.user.findUnique({
      select: { cartId: true },
      where: { id: userId },
    });
  // TODO: ability to delete a chimichanga from cart
  res.send({message: 'chimicahnga deleted!'});
  });

  // prisma.order.findUnique({
  //   where: {id: Number(req.params.id)},
  //   include: {chimichangas: true}
  // })

  // prisma.order.findUnique({
  //   where: {id: Number(req.params.id)},
  //   include: {chimichangas: {
  //     include: {ingredients: true}
  //   }}
});

module.exports = router;

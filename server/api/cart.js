const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { requireUser } = require("./idRequired");

/* might delete */
router.put("/user", requireUser, async (req, res) => {
  const userId = req.userId;
  const cartId = req.body.cartId;
  await prisma.user.update({
    where: { id: userId },
    data: { cartId: cartId },
  });
  res.status(200).send({ cartId });
});

/* 
Authorization required
example body:
  {
      "ingredients": [1,2, 4, 5, 6]
  }
*/
router.post("/", requireUser, async (req, res) => {
  const userId = req.userId;
  const ingredients = req.body.ingredients;
  const { cartId } = await prisma.user.findUnique({
    select: { cartId: true },
    where: { id: userId },
  });

  if (cartId) {
    const newOrder = await prisma.order.update({
      where: {id: cartId},
      data: {
        chimichangas: {
          create: {
            ingredients: {
              connect: ingredients.map((ingredientId) => {
                {id: ingredientId}
              }),
            },
          },
        }
      }
    });
    res.send({cart: newOrder, chimichangas: newOrder.chimichangas, message: "Added chimichanga to cart!"})
  } else if (cartId === null) {
    const newOrder = await prisma.order.create({
      data: {
        userId,
        chimichangas: {
          create: {
            ingredients: {
              connect: ingredients.map((ingredientId) => {
                {id: ingredientId}
              }),
            },
          },
        },
      },
    });
    await prisma.user.update({
      where: { id: userId },
      data: { cartId: newOrder.id },
    });
    res.send({cart: newOrder, chimichangas: newOrder.chimichangas, message: "Created new cart & added a chimchanga!"});
  }

  router.delete("/", requireUser, async (req, res) => {
    const userId = req.userId;
    const chimichangaId = req.body.chimichanga;
    const { cartId } = await prisma.user.findUnique({
      select: { cartId: true },
      where: { id: userId },
    });
    // TODO: ability to delete a chimichanga from cart
    res.send({ message: "chimichanga deleted!" });
  });

  router.get('/', requireUser, async (req, res) => {
    try {
        const userId = req.userId;
        const userCart = await prisma.user.findUnique({
            where: { id: userId },
            include: { cart: { include: { chimichangas: { include: { ingredients: true } } } } }
        });
        res.json(userCart.cart.chimichangas || []);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
});

module.exports = router;

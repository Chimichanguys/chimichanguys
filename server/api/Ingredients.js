const router = require("express").Router();
const { requireUser, requireUserOrAdmin } = require("./idRequired");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", requireUser, async (req, res) => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    res.send(ingredients);
  } catch (error) {
    res.send(error);
  }
});

//GET A USER's INFORMATION
router.get("/user/:id", requireUserOrAdmin, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

//GET a specified order WITH it's chimichangas
router.get("/orders/:id", async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        chimichangas: true,
      },
    });
    res.send(order);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

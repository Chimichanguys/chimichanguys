const router = require("express").Router();
const { requireUser, requireAdmin } = require("./idRequired"); 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//this is currently a route that will return the users information as a json object if the user has a token.


//Currently this route is not in use for anything specifically regarding the front end, because it was originally implemented for getting admin status, however that has been added straight into the signIn authorization


router.get("/:id", requireUser, async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      if (!user) {
        res.send({ error: true, message: "user Not Found" });
      } else {
        res.send(user);
      }
    } catch (error) {
      res.send(error);
    }
  });

    module.exports = router;
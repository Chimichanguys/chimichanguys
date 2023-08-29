const router = require("express").Router();
const { requireUser } = require("./idRequired"); 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


router.get("/", requireUser, async(req, res) => {
    try {
        const ingredients = await prisma.ingredient.findMany();
        res.send(ingredients);
    }catch (error){
        res.send(error);
    }
});

module.exports = router;

const router = require("express").Router();
const { requireUser, requireAdmin } = require("./idRequired"); 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


router.post("/", requireAdmin, async (req, res) => {
    try{
        const ingredient = await prisma.ingredient.create({
            data: req.body,
        });
        res.send(ingredient);
    }catch (error) {
        res.send(error)
    }
})

router.get("/", requireUser, async (req, res) => {
    try {
        const ingredients = await prisma.ingredient.findMany();
        console.log(`this is my ingredients`, ingredients)
        res.send(ingredients);
    }catch (error){
        res.send(error);
    }
});



module.exports = router;

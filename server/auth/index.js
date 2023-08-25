const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
    res.send("You have reached the auth router");
});



//Checks if user is valid
router.post("/signIn", async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { username: username },
    });
    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (passwordMatch) {
            res.send({ message: "User is signed in" });
        } else {
            res.send({ message: "Invalid Login" });
        }
    }
});

router.post("/register", async (req, res) => {
    try {
        const user = req.body;

        user.password = await bcrypt.hash(user.password, 10);

        const result = await prisma.user.create({
            data: user,
        });

        if (result) {
            res.status(201).send(result);
        } else {
            res.send({ message: "Could not add User" });
        }
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;

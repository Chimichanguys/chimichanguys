const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/orderhistory', async (req, res) => {
    const deliveryDetails = req.body;
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                id: deliveryDetails.ingredientId
            }
        });

        if (!ingredient) {
            res.status(400).json({ message: "Ingredient not found" });
            return;
        }
        const order = await prisma.order.create({
            data: {
                ...deliveryDetails,
                userId: req.userId
            }
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Failed to save order", error });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: Number(userId)
            },
            include: {
                chimichangas: {
                    include: {
                        ingredients: true
                    }
                }
            }

        });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching order history:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
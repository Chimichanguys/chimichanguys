const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();


router.post('/saveDeliveryDetails', async (req, res) => {
    const data = req.body;
    console.log(req.body)
    try {
        const savedOrder = await prisma.order.create({
            data: {
            
                name: data.name,
                address: data.address,
                userId: Number(data.userId)
          
            } 
        });

        res.json({ message: 'Details saved successfully', order: savedOrder });

    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Failed to save order details' });
    }
});

module.exports = router;



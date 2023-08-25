// console.log(`database seeded`)


const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {

    const user1 = await prisma.user.create({
        data: {
            username: "tommy",
            email: "tommy@gmail.com",
            password: "tommy123",
            admin: true
        },

    })
    const user2 = await prisma.user.create({
        data: {
            username: "mike",
            email: "mike@gmail.com",
            password: "mike123",
            admin: true

        },

    })
    const user3 = await prisma.user.create({
        data: {
            username: "blake",
            email: "blake@gmail.com",
            password: "blake123",
            admin: true
        },

    })
    const user4 = await prisma.user.create({
        data: {
            username: "elior",
            email: "elior@gmail.com",
            password: "elior123",
            admin: true
        },

    });

    const ingredient1 = await prisma.ingredient.create({
        data: {
            name: "Chicken",
            calories: 700,
            price: 10,
            imageUrl: "picture of chicken",
            type: "protein"
        }
    })
    const ingredient2 = await prisma.ingredient.create({
        data: {
            name: "steak",
            calories: 800,
            price: 12,
            imageUrl: "picture of steak",
            type: "protein"
        }
    })
    const ingredient3 = await prisma.ingredient.create({
        data: {
            name: "white rice",
            calories: 200,
            price: 0,
            imageUrl: "picture of rice",
            type: "rice"
        }
    })
    const ingredient4 = await prisma.ingredient.create({
        data: {
            name: "brown rice",
            calories: 200,
            price: 0,
            imageUrl: "picture of brown rice",
            type: "rice"
        }
    });


    const order1 = await prisma.order.create({
        data: {
            userId: user1.id
        }
    });

    const order2 = await prisma.order.create({
        data: {
            userId: user3.id
        }
    });



    const chimichanga1 = await prisma.chimichanga.create({
        data: {
            orderId: order1.id,
            ingredients: {
                connect: [{ id: ingredient1.id }, { id: ingredient2.id }, { id: ingredient3.id }],
            },
        }
    })
    //order id is what connects the chimis to the order

    const chimichanga2 = await prisma.chimichanga.create({
        data: {
            orderId: order1.id,
            ingredients: {
                connect: [{ id: ingredient1.id }, { id: ingredient2.id }, { id: ingredient3.id }],
            },
        }
    })
    const chimichanga3 = await prisma.chimichanga.create({
        data: {
            orderId: order2.id,
            ingredients: {
                connect: [{ id: ingredient1.id }, { id: ingredient2.id }, { id: ingredient3.id }],
            },
        }
    })

    // const orderFilled = await prisma.order.findUnique({
    //     where: { id: order1.id },
    //     include: {
    //         chimichangas: {
    //             include: {
    //                 ingredients: true
    //             }
    //         }
    //     }
    // })
    // console.log(orderFilled)
}


main();


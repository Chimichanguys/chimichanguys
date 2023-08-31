// console.log(`database seeded`)


const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require('bcryptjs')
const main = async () => {


    const user1 = await prisma.user.create({
        data: {
            username: "tommy",
            email: "tommy@gmail.com",
            password: await bcrypt.hash("tommy123", 10),
            admin: true
        },

    })

    const user2 = await prisma.user.create({
        data: {
            username: "mike",
            email: "mike@gmail.com",
            password: await bcrypt.hash("mike123", 10),
            admin: true

        },

    })
    const user3 = await prisma.user.create({
        data: {
            username: "blake",
            email: "blake@gmail.com",
            password: await bcrypt.hash("blake123", 10),
            admin: true
        },

    })
    const user4 = await prisma.user.create({
        data: {
            username: "elior",
            email: "elior@gmail.com",
            password: await bcrypt.hash("elior123", 10),
            admin: true
        },

    });

    const ingredient1 = await prisma.ingredient.create({
        data: {
            name: "Chicken",
            calories: 400,
            price: 10,
            imageUrl: "picture of chicken",
            type: "protein"
        }
    })
    const ingredient2 = await prisma.ingredient.create({
        data: {
            name: "steak",
            calories: 500,
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

    const ingredient5 = await prisma.ingredient.create({
        data: {
            name: "Pico De Gallo",
            calories: 100,
            price: 0,
            imageUrl: "picture of pico",
            type: "extra"
        }
    });
    const ingredient6 = await prisma.ingredient.create({
        data: {
            name: "Guacamole",
            calories: 200,
            price: 2,
            imageUrl: "picture of guac",
            type: "extra"
        }
    });
    const ingredient7 = await prisma.ingredient.create({
        data: {
            name: "Queso",
            calories: 150,
            price: 1.00,
            imageUrl: "picture of Queso",
            type: "extra"
        }
    });
    const ingredient8 = await prisma.ingredient.create({
        data: {
            name: "Mild Salsa",
            calories: 50,
            price: 0,
            imageUrl: "picture of salsa",
            type: "extra"
        }
    });
    const ingredient9 = await prisma.ingredient.create({
        data: {
            name: "Lettuce",
            calories: 50,
            price: 0,
            imageUrl: "picture of lettuce",
            type: "extra"
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


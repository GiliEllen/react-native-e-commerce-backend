import { Request, Response } from 'express'
import Product, { OrderStatus } from './orderModels'
import Order from './orderModels';
import CartModel from '../cart/cartModal';


const createOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // userID
        if (!id) throw new Error("no id in createOrder")

        const pendingOrder = await Order.find({ userId: id, status: OrderStatus.PENDING })


        if (pendingOrder.length > 0) {
            const cartItemsDB = await CartModel.find({ orderId: pendingOrder[0]._id })

            res.status(200).send({ order: pendingOrder[0], cartItems: cartItemsDB })
        } else {
            const order = new Order({ userId: id, status: OrderStatus.PENDING })

            await order.save()
            res.status(200).send({ order, cartItems: [] })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}


const getAllOrderItems = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // orderId
        if (!id) throw new Error("no id in getAllOrderItems")
        const order = await Order.findById(id)

        //@ts-ignore
        const cartItemsDB = await CartModel.find({ orderId: order._id })

        res.status(200).send({ order, cartItems: cartItemsDB })
    } catch (err) {
        res.status(500).json(err)
    }
}

const getAllOrdersByUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; //userId
        if (!id) throw new Error("no id in getAllOrdersByUser")
        const ordersDB = await Order.find({ userId: id })

        const populatesOrders = await populateCartItemsForOrders(ordersDB)

        res.status(200).send({ orders: populatesOrders })
    } catch (err) {
        res.status(500).json(err)
    }
}
async function populateCartItemsForOrders(orders) {
    try {
        const populatedOrders = [];

        // Iterate through each order
        for (const order of orders) {
            // Find cart items for the current order
            const cartItems = await CartModel.find({ orderId: order._id }).lean().exec();

            // Add cart items to the current order
            const orderWithCartItems = { ...order, cartItems };

            // Add order with cart items to the array
            populatedOrders.push(orderWithCartItems);
        }

        return populatedOrders;
    } catch (error) {
        throw new Error(`Error populating cart items for orders: ${error}`);
    }
}

const finishOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // orderId
        if (!id) throw new Error("no id in finishOrder")

        const pendingOrder = await Order.findByIdAndUpdate(id, { status: OrderStatus.DONE })

        res.status(200).json({ message: 'order closed successfully', pendingOrder })
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    Order.findByIdAndDelete({ _id: req.params.id }) //OrderId
        .then((product) =>
            res.status(200).json({ message: 'order deleted successfully', Order })
        )
        .catch((err) => res.status(400).json(err))
}


export default {
    deleteOrder,
    finishOrder,
    createOrder,
    getAllOrderItems,
    getAllOrdersByUser
}
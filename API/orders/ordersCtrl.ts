import { Request, Response } from 'express'
import Product, { OrderStatus } from './orderModels'
import Order from './orderModels';
import CartModel from '../cart/cartModal';


const createOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("no id in createOrder")

        const pendingOrder = await Order.find({ userId: id, status: OrderStatus.PENDING })


        if (pendingOrder.length > 0) {
            const cartItemsDB = await CartModel.find({ orderId: pendingOrder[0]._id })

            res.status(200).send({ order: pendingOrder[0], cartItems: cartItemsDB })
        } else {
            const order = new Order({ userId: id, status: OrderStatus.PENDING })

            await order.save()
            res.status(200).json(order)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}


const getAllOrderItems = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("no id in getAllOrderItems")
        const pendingOrder = await Order.findOne({ userId: id, status: OrderStatus.PENDING })

        //@ts-ignore
        const cartItemsDB = await CartModel.find({ orderId: pendingOrder._id })

        if (pendingOrder) res.status(200).send({ order: pendingOrder, cartItems: cartItemsDB })
    } catch (err) {
        res.status(500).json(err)
    }
}
const getAllOrdersByUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("no id in getAllOrdersByUser")
        const ordersDB = await Order.findOne({ userId: id })

        res.status(200).send({ ordersDB })
    } catch (err) {
        res.status(500).json(err)
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
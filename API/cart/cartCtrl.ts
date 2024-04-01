import { Request, Response } from 'express'
import CartModel from './cartModal'

const getAllCartItems = async (req: Request, res: Response) => {
    try {
        const { id } = req.params.id
        const cartArray = await CartModel.find({ orderId: id }).populate(["orderId", "productId"])
        res.status(200).send({ ok: true, cart: cartArray })
    } catch (err) {
        res.status(500).send({ err })
    }
}

// body: {
//     productId: _id,
//     orderId: _id,
//     amount: Number,
//     color: String,
//     size: String,
// }
const addItemToCart = async (req: Request, res: Response) => {
    try {
        const cartItem = new CartModel(req.body)

        await cartItem.save()
        res.status(200).send({ ok: true , cartItem})
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteItemFromCart = async (req: Request, res: Response) => {
    CartModel.findByIdAndDelete({ _id: req.params.id })
        .then((cartItem) =>
            res.status(200).send({ message: 'Cart Item removed from cart successfully', cartItem })
        )
        .catch((err) => res.status(400).send({ err }))
}

// body: {
//     amount: Number,
// }
const updateProductAmount = async (req: Request, res: Response) => {
    try {
        const cartItem = await CartModel.findByIdAndUpdate(req.params.id, { amount: req.body.amount }, { new: true });
        if (!cartItem) {
            return res.status(404).send({ message: 'Cart Item not found' });
        }
        res.status(200).send({ message: 'Cart Item updated successfully', cartItem });
    } catch (err) {
        res.status(500).json({ err });
    }
}

export default {
    addItemToCart,
    getAllCartItems,
    deleteItemFromCart,
    updateProductAmount,
}
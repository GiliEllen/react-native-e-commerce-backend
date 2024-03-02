import { Schema, model } from 'mongoose'
import Product from '../products/productsModel'
import User from '../users/userModel'

const cartSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: Product },
    userId: { type: Schema.Types.ObjectId, ref: User },
    amount: Number,
    color: String,
    size: String,
})

const CartModel = model('users', cartSchema)

export default CartModel
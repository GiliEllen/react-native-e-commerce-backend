import { Schema, model } from 'mongoose'
import Order from '../orders/orderModels'
import Product from '../products/productsModel'

const cartSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: Product },
    amount: Number,
    color: String,
    size: String,
    orderId: { type: Schema.Types.ObjectId, ref: Order }
})

const CartModel = model('cartitems', cartSchema)

export default CartModel
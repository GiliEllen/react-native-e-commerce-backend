import { Schema, model } from 'mongoose'
import User from '../users/userModel'

export enum OrderStatus {
    PENDING = "pending",
    DONE = "done"
}

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: User },
    status: { type: String, default: OrderStatus.PENDING },
    createdAt: Date,
    completedAt: Date || null
})

const Order = model('orders', orderSchema)

export default Order
import express from 'express';
import RateLimit from 'express-rate-limit';
import userRouter from '../users/userRoutes'
import productRouter from '../products/productsRoutes'
import orderRoutes from "../orders/orderRoutes";
import cartItemsRoutes from "../cart/cartRoutes"

const router = express.Router()

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
})

// apply rate limiter to all requests
router.use(limiter)

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/cart-items', cartItemsRoutes)
router.use("/orders", orderRoutes)

export default router
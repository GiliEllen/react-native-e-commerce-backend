import express from 'express';
import RateLimit from 'express-rate-limit';
import userRouter from '../users/userRoutes'
import productRouter from '../products/productsRoutes'

const router = express.Router()

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
})

// apply rate limiter to all requests
router.use(limiter)

router.use('/user', userRouter)
router.use('/product', productRouter)

export default router
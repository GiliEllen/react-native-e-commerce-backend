import express, { Router } from 'express'
import orderController from './ordersCtrl'

const router: Router = express.Router()

router.get('/:id', orderController.getAllOrderItems) // userID
router.post('/:id', orderController.createOrder) // userID
router.delete('/:id', orderController.deleteOrder) // orderID
router.put('/:id', orderController.finishOrder) //OrderID

export default router
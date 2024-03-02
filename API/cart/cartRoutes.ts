import express, { Router } from 'express'
import cartController from './cartCtrl'

const router: Router = express.Router()

router.get('/:id', cartController.getAllCartItems) //userId here
router.post('/add-item', cartController.addItemToCart)
router.delete('/:id', cartController.deleteItemFromCart) //cartItemId
router.put('/:id', cartController.updateProductAmount) //cartItemId

export default router
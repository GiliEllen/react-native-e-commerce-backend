import express, { Router } from 'express'
import productController from './productsCtrl'

const router: Router = express.Router()

router.get('/', productController.getAllProducts)
router.post('/', productController.addProduct)
router.post('/add', productController.addProducts)
router.get('/:id', productController.getSpecificProduct)
router.delete('/:id', productController.deleteProduct)
router.put('/:id', productController.updateProduct)

export default router
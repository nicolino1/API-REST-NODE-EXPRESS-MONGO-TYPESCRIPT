import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { IProduct } from '../entities/products/utils/productTypes';
import { upsertProductsController, deleteProductsByIdController, getProductsByIdController, listAllProductsController } from '../entities/products/products.controller';

export const router = Router();

router.get('/', (_req, res) => {
    listAllProductsController().then((result) => res.status(result.status as number).send({message: result.message, products: result.data})).catch(e => console.log(e))
})

router.post('/', authenticate, (req, res) => {
    const products = req.body.map((prod: any) => {
        const product: IProduct = {
            ...prod
        }
        return product
    }

    );
    upsertProductsController(products).then((result) => { const resp = result.map((r) => { return { message: r.message, products: r.data } }); return res.status(200).send(resp) }).catch(e => console.log(e));
})

router.post('/:id', authenticate, (req, res) => {
  deleteProductsByIdController(req.params.id).then((result) => res.status(result.status as number).send({message: result.message, products: result.data})).catch(e => console.log(e))
})

router.get('/:id', (req, res) => {
  getProductsByIdController(req.params.id).then((result) => res.status(result.status as number).send({message: result.message, products: result.data})).catch(e => console.log(e))
})
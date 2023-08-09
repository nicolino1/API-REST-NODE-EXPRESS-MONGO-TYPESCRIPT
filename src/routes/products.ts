import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { IProduct } from '../entities/products/utils/productTypes';
import { upsertProductsController, deleteProductsByIdController, getProductsByIdController, listAllProductsController } from '../entities/products/products.controller';

// initilizing express router
export const router = Router();

// get method used to list all products
router.get('/', (_req, res) => {
  // call to list products controller
  listAllProductsController()
    .then((result) =>
      // setting status and sending response
      res.status(result.status as number)
        .send({ message: result.message, products: result.data }))
    .catch(e => console.log(e))
})

// post method used to create and update one or many products, checks for permissions before
router.post('/', authenticate, (req, res) => {
  // creating products array
  const products = req.body.map((prod: any) => {
    const product: IProduct = {
      ...prod
    }
    return product
  }

  );
  // call to upsert controller
  upsertProductsController(products)
    .then((result) =>
    // setting status and sending response array
    {
      const resp = result.map(
        (r) => { return { message: r.message, products: r.data } });
      return res.status(200).send(resp)
    })
    .catch(e => console.log(e));
})

// post method used to delete products by id, checks for permissions before
router.post('/:id', authenticate, (req, res) => {
  // call to delete controller
  deleteProductsByIdController(req.params.id)
    .then((result) =>
      // setting status and sending response
      res.status(result.status as number)
        .send({ message: result.message, products: result.data }))
    .catch(e => console.log(e))
})

// get method used to find one product by id
router.get('/:id', (req, res) => {
  // call to get product by id controller
  getProductsByIdController(req.params.id)
    .then((result) =>
      // setting status and sending response
      res.status(result.status as number)
        .send({ message: result.message, products: result.data }))
    .catch(e => console.log(e))
})
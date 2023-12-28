import { Router } from 'express';
import ProductModel from '../models/ProductModel.js';
import ProductController from '../controllers/ProductController.js';
const productRouter = Router();

productRouter.get('/', (req, res) => { //product -> return product
  res.send('product');
});

productRouter.get('/list', async (req, res) => { 
  const result = await ProductModel.getGroupByProduct(); 
  res.json(result);
})

//GET /product/:product_id
productRouter.get('/:product_id', ProductController.getProductById);



export default productRouter;

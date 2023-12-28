import { Router } from 'express';
import ProductModel from '../models/ProductModel.js';
const productRouter = Router();

productRouter.get('/', (req, res) => { //product -> return product
  res.send('product');
});

productRouter.get('/list', async (req, res) => { 
  const result = await ProductModel.getGroupByProduct(); 
  res.json(result);
})

//GET /product/:product_id
//productRouter.get('/:product_id', ProductController.getProductById);
productRouter.get('/:product_id', async (req, res) => {
    const productId = req.params.product_id;
    const product = await ProductModel.getProductById(productId);
    res.json(product);
});



export default productRouter;

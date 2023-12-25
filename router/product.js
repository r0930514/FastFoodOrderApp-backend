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


export default productRouter;
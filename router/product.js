import { Router } from 'express';
import ProductModel from '../models/ProductModel.js';
import logger from '../utils/logger.js';
const productRouter = Router();

productRouter.get('/', (req, res) => {
  res.send('product');
});

productRouter.get('/list', async (req, res) => {
  const result = await ProductModel.getGroupByProduct();
  res.json(result);
})


export default productRouter;
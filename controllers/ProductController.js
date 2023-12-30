import ProductModel from '../models/ProductModel.js';
import logger from '../utils/logger.js';

class ProductController 
{
  /**
   * @async
   * @param {express.Request} req 
   * @param {express.Response} res
   */

  static async getProductById(req, res) {
    try 
    {
      const productId = req.params.product_id;
      const products = await ProductModel.getProductById(productId);
      const spec = await ProductModel.getSpecById(productId);
      for(let product of products)
      {
        product.spec = spec;
      }
      if (products.length>0) res.json(products);
      else res.status(404).send('Not found');
    } 
    catch (error) 
    {
      logger.error(error.message);
      res.status(500).send('Error');
    }
  }
}

export default ProductController;

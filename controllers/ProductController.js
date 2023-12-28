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
      const product = await ProductModel.getProductById(productId);
      if (product.length>0) res.json(product);
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

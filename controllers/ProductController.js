import ProductModel from '../models/ProductModel.js';

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

      if (product) 
      {
        res.json(product);
      }
      else 
      {
        res.status(404).json({ message: 'none' });
      }
    } 
    catch (error) 
    {
      console.error(error);
      res.status(500).send('Error');
    }
  }
}

export default ProductController;

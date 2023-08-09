import { IMessageInfo } from "../../utils/types";
import Product from "./model/Product";
import { IProduct } from "./utils/productTypes";

/* upsertProduct service receives a product object, and creates 
   a new product if it isn't exist, if not, the method updates
   the existing product
   parameters: 
    product {IProduct}: product data
   returns message info object
*/
export const upsertProduct = async (product: IProduct): Promise<IMessageInfo> => {
  // message info declaration
  let res: IMessageInfo
  try {
    //checking for an existing email account
    const existingProduct = await Product.findOne({ prdId: product.prdId });
    // if product exist
    if (existingProduct !== null) {
      // update product
      await Product.updateOne({ prdId: product.prdId }, product);
      res = { success: true, message: `product was successfuly updated` }
    }
    else {
      // if product doesn't exist
      // create new product
      const result = new Product({
        ...product
      })
      // save product
      await result.save();
      res = { success: true, message: "product was successfuly created" };
    }
    return res
  } catch (err: any) {
    res = { success: false, message: err.message };
    return res
  }
}

/* listAllProduct service returns a list of all products stored
   parameters: None
   returns message info object
*/
export const listAllProducts = async (): Promise<IMessageInfo> => {
  // message info declaration
  let res: IMessageInfo
  try {
    // settings product list with all products stored in database
    const productList: IProduct[] = await Product.find();
    res = { success: true, message: "list of all products", data: productList };
    return res
  } catch (err: any) {
    res = { success: false, message: err.message };
    return res
  }
}

/* deleteProductById service receives a product id, and deletes
   the specific product if it exist
   parameters: 
    id {string}: product id
   returns message info object
*/
export const deleteProductById = async (id: string): Promise<IMessageInfo> => {
  // message info declaration
  let res: IMessageInfo
  try {
    // find product with id and delete it
    const product: IProduct[] | null = await Product.findByIdAndDelete(id);
    // if not exist
    if (!product) {
      res = { success: true, message: `product with id: ${id} doesn't exist`, data: product };
    }
    else
      // if exist
      res = { success: true, message: `product with id: ${id} was successfuly deleted`, data: product };
    return res
  } catch (err: any) {
    res = { success: false, message: err.message };
    return res
  }
}

/* getProductById service receives a product id, and returns
   the specific product if it exist
   parameters: 
    id {string}: product id
   returns message info object
*/
export const getProductById = async (id: string): Promise<IMessageInfo> => {
  // message info declaration
  let res: IMessageInfo
  try {
    // find product by id
    const product: IProduct[] | null = await Product.findById(id);
    // if not exist
    if (!product) {
      res = { success: true, message: `product with id: ${id} doesn't exist`, data: product };
    }
    else
      // if exist
      res = { success: true, message: '', data: product };
    return res
  } catch (err: any) {
    res = { success: false, message: err.message };
    return res
  }
}
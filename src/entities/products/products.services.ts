import { IMessageInfo } from "../../utils/types";
import Product from "./model/Product";
import { IProduct } from "./utils/productTypes";

export const upsertProduct = async (product: IProduct): Promise<IMessageInfo> => {
    let res: IMessageInfo
    try {
      //checking for an existing email account
      const existingProduct = await Product.findOne({prdId: product.prdId});
  
      if (existingProduct !== null) {
        await Product.updateOne({prdId: product.prdId}, product);
        res = { success: true, message: `product was successfuly updated` }
      }
      else {
        const result = new Product({
          ...product
        })
  
        await result.save();
        res = { success: true, message: "product was successfuly created" };
      }
      return res
    } catch (err: any) {
      res = { success: false, message: err.message };
      return res
    }
  }

export const listAllProducts = async (): Promise<IMessageInfo> => {
  let res: IMessageInfo
  try {
    const productList: IProduct[] = await Product.find();
    res = { success: true, message: "list of all products", data: productList };
    return res
  } catch (err: any) {
      res = { success: false, message: err.message };
      return res
    }
}

export const deleteProductById = async (id: string): Promise<IMessageInfo> => {
let res: IMessageInfo
try {

    const product: IProduct[] | null = await Product.findByIdAndDelete(id);
    if(!product) {
      res = { success: true, message: `product with id: ${id} doesn't exist`, data: product };
    }
    else res = { success: true, message: `product with id: ${id} was successfuly deleted`, data: product };
    return res
} catch (err: any) {
    res = { success: false, message: err.message };
    return res
}
}

export const getProductById = async (id: string): Promise<IMessageInfo> => {
    let res: IMessageInfo
    try {
    
        const product: IProduct[] | null = await Product.findById(id);
        if(!product) {
          res = { success: true, message: `product with id: ${id} doesn't exist`, data: product };
        }
        else res = { success: true, message: '', data: product };
        return res
    } catch (err: any) {
        res = { success: false, message: err.message };
        return res
    }
}
import { validateFields } from "../../utils/validation";
import { IMessageInfo, IResponse } from "../../utils/types";
import { productValidateSchema } from "./utils/productValidateSchema";
import { IProduct } from "./utils/productTypes";
import { upsertProduct, listAllProducts, deleteProductById, getProductById } from "./products.services";

/* upsertProductController receives a product object array, validates the 
   data in that array one by one, then calls upserProduct service and 
   finally creates and returns the response array
   parameters: 
    user {IProduct[]}: array with products data
    returns response object array
*/
export const upsertProductsController = async (products: IProduct[]): Promise<IResponse[]> => {
    // initializing response
    const response: IResponse[] =
        await Promise.all(
            products.map(async (prod: IProduct): Promise<IResponse> => {
                // fields validation
                const validation = validateFields(prod, productValidateSchema);
                // if validations fails
                if (!validation.success) {
                    return { status: 400, message: validation.message, data: prod }
                }
                else {
                    // if validation success
                    // call to upsert product service
                    const result: IMessageInfo = await upsertProduct(prod);
                    return { status: result.success ? 200 : 400, message: result.message, data: prod }
                }
            }));
    return response;
}

/* listAllProductController calls to listAllProducts service and returns
   a message with the list of products 
   parameters: None
   returns response object
*/
export const listAllProductsController = async (): Promise<IResponse> => {
    // initializing response
    let response: IResponse;
    // call to list all products service
    const result: IMessageInfo = await listAllProducts();
    response = { status: result.success ? 200 : 400, message: result.message, data: result.data }

    return response;
}

/* deletetProductsByIdController receives a product id then calls 
   deleteProductById service and finally creates and returns the 
   response array
   parameters: 
    id {string}: product id
    returns response object
*/
export const deleteProductsByIdController = async (id: string): Promise<IResponse> => {
    // initializing response
    let response: IResponse;
    // call to dele product service
    const result: IMessageInfo = await deleteProductById(id);
    response = { status: result.success ? 200 : 400, message: result.message, data: result.data }

    return response;
}

/* getProductsByIdController receives a product id then calls 
   getProductById service and finally creates and returns the response array
   parameters: 
    id {string}: product id
    returns response object
*/
export const getProductsByIdController = async (id: string): Promise<IResponse> => {
    // initializing response
    let response: IResponse;
    // call to get product service
    const result: IMessageInfo = await getProductById(id);
    response = { status: result.success ? 200 : 400, message: result.message, data: result.data }

    return response;
}

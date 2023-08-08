import { validateFields } from "../../utils/validation";
import { IMessageInfo, IResponse } from "../../utils/types";
import { productValidateSchema } from "./utils/productValidateSchema";
import { IProduct } from "./utils/productTypes";
import { upsertProduct, listAllProducts, deleteProductById, getProductById } from "./products.services";

export const upsertProductsController = async (products: IProduct[]): Promise<IResponse[]> => {
    // initializing response
    const response: IResponse[] =
        await Promise.all(
            products.map(async (prod: IProduct): Promise<IResponse> => {
                // fields validation
                const validation = validateFields(prod, productValidateSchema);
                if (!validation.success) { 
                    return { status: 400, message: validation.message, data: prod } 
                }
                else {
                    const result: IMessageInfo = await upsertProduct(prod);
                    return { status: result.success ? 200 : 400, message: result.message, data: prod }
                }
            }));
    return response;
}

export const listAllProductsController = async (): Promise<IResponse> => {
    // initializing response
    let response: IResponse;

    const result: IMessageInfo = await listAllProducts();
    response = { status: result.success ? 200 : 400, message: result.message, data: result.data }

    return response;
}

export const deleteProductsByIdController = async (id: string): Promise<IResponse> => {
    // initializing response
    let response: IResponse;

    const result: IMessageInfo = await deleteProductById(id);
    response = { status: result.success ? 200 : 400, message: result.message, data: result.data }

    return response;
}

export const getProductsByIdController = async (id: string): Promise<IResponse> => {
    // initializing response
    let response: IResponse;

    const result: IMessageInfo = await getProductById(id);
    response = { status: result.success ? 200 : 400, message: result.message, data: result.data }

    return response;
}

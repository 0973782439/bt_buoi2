import http from "../Utils/Http";
import { IResponseApi } from "../interfaces/ICommon";
import { IProduct } from "../interfaces/IProduct";

export const getProduct = () => http.get<IResponseApi<IProduct>>("product");
export const deleteProduct = (id: number) =>
  http.delete<IResponseApi<IProduct>>(`product/${id}`);
export const getProductById = (id: number) =>
  http.get<IResponseApi<IProduct>>(`product/${id}`);
export const updateProduct = (data: IProduct) =>
  http.put<IResponseApi<IProduct>>("product", data);

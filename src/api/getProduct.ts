import { API_ENDPOINTS } from "../config/api";
import { Product } from "./types";
import { makeGetRequest, BaseResponse } from "../utils/axios_get";

//https://api.escuelajs.co/api/v1/products/4
//надо приклетить id к url
const getProduct = async (id: string): Promise<BaseResponse<Product>> => {
  const response = await makeGetRequest<Product>({
    url: `${API_ENDPOINTS.PRODUCTS}/${id}`,
  });
  if (response.isError) return { isError: true };
  else return { data: response.data, isError: false };
};

export default getProduct;

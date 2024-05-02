import { API_ENDPOINTS } from "../config/api";
import { Product } from "./types";
import { makeGetRequest, BaseResponse } from "../utils/axios_get";

const getAllProducts = async (
  params?: Record<string, string | number>
): Promise<BaseResponse<Product[]>> => {
  const response = await makeGetRequest<Product[]>({
    url: API_ENDPOINTS.PRODUCTS,
    params: params,
  });
  if (response.isError) return { isError: true };
  else return { data: response.data, isError: false };
};

export default getAllProducts;

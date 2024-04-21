import { API_ENDPOINTS } from "../config/api";
import { Product } from "./types";
import { makeGetRequest } from "../utils/axios_get";


const getAllProducts = async (params?:Record<string,string|number>) => {
  const data = await makeGetRequest<Product[]>({url:API_ENDPOINTS.PRODUCTS,params:params});
  return data;
};

export default getAllProducts;
import { API_ENDPOINTS } from "../config/api";
import { Product } from "./types";
import { makeGetRequest } from "../utils/axios_get";

const getAllProducts = async () => {
  const data = await makeGetRequest<Product[]>({url:API_ENDPOINTS.PRODUCTS});
  return data;
};

export default getAllProducts;
import { API_ENDPOINTS } from "../config/api";
import { Product } from "./types";
import { makeGetRequest } from "../utils/axios_get";

//https://api.escuelajs.co/api/v1/products/4
//надо приклетить id к url
const getProduct = async (id: number ) => {
  const data = await makeGetRequest<Product>({url:API_ENDPOINTS.PRODUCTS + "/" + id.toString()});
  return data;
};

export default getProduct
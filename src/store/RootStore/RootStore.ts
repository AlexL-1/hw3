import QueryParamsStore from "store/QueryParamsStore"; //этот стор глобальнй, он хранит query строку приложения.
import ProductDetailStore from "store/ProductDetailStore";
import ProductsStore from "store/ProductsStore";

//это хаб, хранит полями ссылки на все другие сторы

export default class RootStore {
  readonly productsStore = new ProductsStore();
  readonly productDetailStore = new ProductDetailStore();
  readonly queryParamsStore = new QueryParamsStore();
}

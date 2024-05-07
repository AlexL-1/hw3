//этот класс хранит данные, которые используются в страницах ProductDetail

import getAllProducts from "api/getAllProducts";
import getProduct from "api/getProduct";
import { Product } from "api/types";
import { makeAutoObservable } from "mobx";

// const [productData, setProductData] = useState<Product | null>(null);
// const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

class ProductDetailStore {
  id: string = ""; //приходит к нам из query
  productData: Product | null = null; //достаем через запрос
  relatedProducts: Product[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setId = (val: string) => {
    this.id = val;
    this.getProduct(); //если присвоили id, так надо сразу грузить
  };

  private getProduct = () => {
    const fetch = async () => {
      const result = await getProduct(this.id);
      if (!result.isError) {
        const category: string = result.data.category.id;
        //надо 3 других продукта из той же категории, но мы запросим 4 на тот случай, если попадется текущий продукт

        const relatedResult = await getAllProducts({
          limit: 4,
          categoryId: category,
        });

        if (!relatedResult.isError) {
          this.relatedProducts = relatedResult.data.filter(
            (elm) => elm.id != this.id
          );
        }

        this.productData = result.data; //положили продукт в state
      }
    };
    fetch();
  };
}

export default ProductDetailStore;

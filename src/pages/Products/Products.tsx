import Button from "components/Button";
import styles from "./Products.module.scss";
import MultiDropdown, { Option } from "components/MultiDropdown";
import Input from "components/Input";
import Pagination from "components/Pagination";
import Text from "components/Text";
import { useEffect, useState } from "react";
import getAllProducts from "api/getAllProducts";
import { Product } from "api/types";
import Card from "components/Card";
import { useLocation, useNavigate } from "react-router-dom";

// код компонента

//запрос всех продуктов возвращает такой массив
//[{"id":10,"title":"Product 1 Updated","price":1000,"description":"Description 1 Updated","images":["[\"https://i.imgur.com/wXuQ7bm.jpeg\"","\"https://i.imgur.com/BZrIEmb.jpeg\"","\"https://i.imgur.com/KcT6BE0.jpeg\"]"],"creationAt":"2024-04-18T20:15:40.000Z","updatedAt":"2024-04-19T16:39:49.000Z","category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg","creationAt":"2024-04-18T20:15:40.000Z","updatedAt":"2024-04-18T20:15:40.000Z"}},....]

//hard-coded categories. API allows to create custom goods, so the categories is enormous
const categories: Option[] = [
  { key: "1", value: "Clothes" },
  { key: "2", value: "Electronics" },
  { key: "3", value: "Furniture" },
  { key: "4", value: "Shoes" },
  { key: "5", value: "Miscellaneous" },
];

const Products = () => {
  //продуктов может быть много, нам надо только 3 показать

  const ELEMENTS_PER_PAGE: number = 6;
  const PAGES_TOTAL: number = 10; //there are only 46 normal recors in the AP. others are custom created without proper image.

  const navigate = useNavigate();

  let offset: number = 0;
  let page: number = 1;
  const location = useLocation(); //надо отслеживать номера страниц

  const [productsArray, SetProductsArray] = useState<Product[]>([]);

  const query = new URLSearchParams(location.search);
  if (query.has("page")) {
    page = Number(query.get("page"));
    if (page < 1) page = 1; //normalize page value
    if (page > PAGES_TOTAL) page = PAGES_TOTAL; //normalize page value
    offset = ELEMENTS_PER_PAGE * (page - 1); //page1 == offset 0
  }

  useEffect(() => {
    const fetch = async () => {
      const result = await getAllProducts({
        limit: ELEMENTS_PER_PAGE,
        offset: offset,
      });

      SetProductsArray(result); //теперь результаты надо положит в state
      //и после этого компонент перевысветится
      //то есть будет 2 рендера: начальный пустой и потом с данными
      //на начальном можно было бы показать скелетоны
    };
    fetch();
  }, []); //запускаем при загрузке, а offset берем из строки

  return (
    <div className={styles.page}>
      <h1> Products</h1>

      <p>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>
      <div className={styles.filterAndCards}>
        <Input
          placeholder="Search product"
          value=""
          onChange={() => {}}
          style={{ width: "1079px", marginRight: "20px" }}
        />
        <Button>Find now</Button>

        <div className={styles.filterContainer}>
          <div className={styles.filter}>
            <MultiDropdown
              options={categories}
              value={[]}
              onChange={function (_value: Option[]): void {
                throw new Error("Function not implemented.");
              }}
              getTitle={function (_value: Option[]): string {
                return "Filter";
              }}
            />
          </div>
        </div>

        <div className={styles.total}>
          <span className={styles.totalPhrase}>Total Product</span>
          <span className={styles.totalNumber}>{productsArray.length}</span>
        </div>

        <div className={styles.cards}>
          {/* и вот тут надо по 3 разложить наш массив и отображать карточки*/}
          {productsArray.slice(0, ELEMENTS_PER_PAGE).map((elm) => (
            <Card
              key={elm.id}
              captionSlot={elm.category.name}
              image={elm.images[0]}
              title={elm.title}
              subtitle={elm.description}
              contentSlot={elm.price + "$"}
              onClick={() => navigate(`/product?id=${elm.id}`)}
            />
          ))}
        </div>
      </div>
      <Pagination
        baseUrl={"products?page="}
        currentPage={page}
        totalPages={PAGES_TOTAL}
      />
    </div>
  );
};

export default Products;

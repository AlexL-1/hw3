import Button from "components/Button";
import styles from "./Products.module.scss"; // импорт стилей
import MultiDropdown, { Option } from "components/MultiDropdown";
import Input from "components/Input";
import Text from "components/Text";
import { useEffect, useState } from "react";
import getAllProducts from "api/getAllProducts";
import { Product } from "api/types";
import Card from "components/Card";
import { useLocation, useNavigate } from "react-router-dom";

// код компонента

//запрос всех продуктов возвращает такой массив
//[{"id":10,"title":"Product 1 Updated","price":1000,"description":"Description 1 Updated","images":["[\"https://i.imgur.com/wXuQ7bm.jpeg\"","\"https://i.imgur.com/BZrIEmb.jpeg\"","\"https://i.imgur.com/KcT6BE0.jpeg\"]"],"creationAt":"2024-04-18T20:15:40.000Z","updatedAt":"2024-04-19T16:39:49.000Z","category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg","creationAt":"2024-04-18T20:15:40.000Z","updatedAt":"2024-04-18T20:15:40.000Z"}},....]

const Products = () => {
  //продуктов может быть много, нам надо только 3 показать

  const ELEMENTS_TO_SHOW: number = 6;

  const navigate = useNavigate();

  let offset: number = 0;
  const location = useLocation(); //надо отслеживать номера страниц
  const query = new URLSearchParams(location.search);
  if (query.has("page")) {
    var page: number = Number(query.get("page"));
    if (page < 1) page = 1; //normalize page value
    offset = ELEMENTS_TO_SHOW * (page - 1); //page1 == offset 0
    console.log(offset); //?page=2
  }

  const [productsArray, SetProductsArray] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getAllProducts({ limit: 12, offset: offset });

      SetProductsArray(result); //теперь результаты надо положит в state
      //и после этого компонент перевысветится
      //то есть будет 2 рендера: начальный пустой и потом с данными
      //на начальном можно было бы показать скелетоны
    };
    fetch();
  }, []); //запускаем при загрузке, а offset берем из строки

  //котвертировать productsArray в карточки

  return (
    <div className={styles.Products}>
      <div style={{ textAlign: "center" }}>
        <Text tag="h1" view="title" className="header">
          Products
        </Text>
      </div>

      <div className={styles.underHeader}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </div>
      <div style={{ width: "1240px", margin: "auto" }}>
        <Input
          value={"Search product"}
          onChange={function (_value: string): void {
            throw new Error("Function not implemented.");
          }}
          style={{ width: "1079px", marginRight: "20px" }}
        />
        <Button>Find now</Button>

        <div className={styles.filter}>
          <MultiDropdown
            options={[]}
            value={[]}
            onChange={function (_value: Option[]): void {
              throw new Error("Function not implemented.");
            }}
            getTitle={function (_value: Option[]): string {
              return "Filter";
            }}
          />
        </div>

        <div className={styles.total}>
          <span className={styles.totalPhrase}>Total Product</span>
          <span className={styles.totalNumber}>{productsArray.length}</span>
        </div>

        <div className={styles.cards}>
          {/* и вот тут надо по 3 разложить наш массив и отображать карточки*/}
          {productsArray.slice(0, ELEMENTS_TO_SHOW).map((elm) => (
            <Card
              key={elm.id}
              captionSlot={elm.category.name}
              image={elm.images[0]}
              title={elm.title}
              subtitle={elm.description}
              contentSlot={elm.price + "$"}
              onClick={() => navigate(`/product/${elm.id}`)}
            />
          ))}
        </div>
      </div>

      <div className={styles.pagination}>
        <a>Prev</a>
        <a href="/products?page=1">1</a>
        <a href="/products?page=2">2</a>
        <a className={styles.currentPage}>3</a>
        <a>4</a> .... <a>10</a>
        <a>Next</a>
      </div>
    </div>
  );
};

// Экспортируем компонент
export default Products;

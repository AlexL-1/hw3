import Button from "components/Button";
import styles from "./Products.module.scss"; // импорт стилей
import MultiDropdown, { Option } from "components/MultiDropdown";
import Input from "components/Input";
import Text from "components/Text";
import { ReactElement, useEffect, useState } from "react";
import getAllProducts from "api/getAllProducts";
import { Product } from "api/types";
import Card from "components/Card";

// код компонента

//запрос всех продуктов возвращает такой массив
//[{"id":10,"title":"Product 1 Updated","price":1000,"description":"Description 1 Updated","images":["[\"https://i.imgur.com/wXuQ7bm.jpeg\"","\"https://i.imgur.com/BZrIEmb.jpeg\"","\"https://i.imgur.com/KcT6BE0.jpeg\"]"],"creationAt":"2024-04-18T20:15:40.000Z","updatedAt":"2024-04-19T16:39:49.000Z","category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg","creationAt":"2024-04-18T20:15:40.000Z","updatedAt":"2024-04-18T20:15:40.000Z"}},....]

const ELEMENTS_TO_SHOW: number = 6;

const Products = () => {
  //продуктов может быть много, нам надо только 3 показать

  const [productsArray, SetProductsArray] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getAllProducts();
      //console.log("result", result);

      SetProductsArray(result); //теперь результаты надо положит в state
      //и после этого компонент перевысветится
      //то есть будет 2 рендера: начальный пустой и потом с данными
      //на начальном можно было бы показать скелетоны
    };
    fetch();
  }, []); //запускаем один раз при загрузке страницы []

  //котвертировать productsArray в карточки

  console.log(productsArray.slice(0, ELEMENTS_TO_SHOW)[0]);

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
          onChange={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
          style={{ width: "1079px", marginRight: "20px" }}
        />
        <Button>Find now</Button>

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

        <div style={{ fontSize: "32px", fontWeight: "bold" }}>
          Total Product {productsArray.length}
        </div>

        <div className={styles.cards}>
          {/* и вот тут надо по 3 разложить наш массив и отображать карточки*/}
          {productsArray.slice(0, ELEMENTS_TO_SHOW).map((elm) => (
            <Card
              key={elm.id}
              image={elm.images[0]}
              title={elm.title}
              subtitle={elm.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Экспортируем компонент
export default Products;

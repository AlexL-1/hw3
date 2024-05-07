import Button from "components/Button";
import styles from "./Products.module.scss";
import Dropdown, { Option } from "./Dropdown";
import Input from "components/Input";
import Pagination from "./Pagination";
import { useEffect } from "react";
import Card from "components/Card";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import rootStore from "store/RootStore";

//в API люди свои товары и категории добавляют,
//и получается каша из категорий
//поэтома hard-code массив категорий
const categories: Option[] = [
  { key: "", value: "" }, //пустой, чтобы выключать категории
  { key: "1", value: "Clothes" },
  { key: "2", value: "Electronics" },
  { key: "3", value: "Furniture" },
  { key: "4", value: "Shoes" },
  { key: "5", value: "Miscellaneous" },
];

const Products = observer(() => {
  const productsStore = rootStore.productsStore;

  const queryParamsStore = rootStore.queryParamsStore;

  const navigate = useNavigate(); //для переключения страниц

  useEffect(() => {
    let categoryId = queryParamsStore.getValByKey("categoryId"); //там сложный тип, но нам нужна строка
    if (typeof categoryId === "string") productsStore.setCategoryId(categoryId);

    let title = queryParamsStore.getValByKey("title");
    if (typeof title === "string") productsStore.setTitle(title);

    let page = queryParamsStore.getValByKey("page");
    if (typeof page === "string") productsStore.setPage(parseInt(page));

    productsStore.makeSearch();
  }, []); //зависимостей не ставим, теперь следит mobx

  return (
    <div className={styles.page}>
      <h1>Products</h1>

      <p>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>
      <div className={styles.filterAndCards}>
        <Input
          style={{ width: "1079px", marginRight: "20px" }}
          placeholder="Search product"
          value={productsStore.inputText}
          onChange={(val) => {
            productsStore.setInputText(val);
          }}
        />
        <Button
          onClick={() => {
            queryParamsStore.setParam("title", productsStore.inputText); //  надо положить в url
            productsStore.setTitle(productsStore.inputText);

            productsStore.setPage(1);
            queryParamsStore.setParam("page", "1"); //при новом поске надо показыать первую страницу

            productsStore.makeSearch();
          }}
        >
          Find now
        </Button>

        <div className={styles.filterContainer}>
          <div className={styles.filter}>
            <Dropdown
              options={categories}
              keySelected={productsStore.categoryId}
              onChange={(val) => {
                //если категория осталась старой, то не надо делать поиск
                if (val !== productsStore.categoryId) {
                  productsStore.setCategoryId(val);
                  queryParamsStore.setParam("categoryId", val); // и ещё надо положить в url

                  productsStore.setPage(1);
                  queryParamsStore.setParam("page", "1"); //при новом поиске надо показыать первую страницу
                  productsStore.makeSearch();
                }
              }}
            />
          </div>
        </div>

        <div className={styles.total}>
          <span className={styles.totalPhrase}>Total Product</span>
          <span className={styles.totalNumber}>
            {productsStore.productsTotal}
          </span>
        </div>

        <div className={styles.cards}>
          {/* и вот тут надо по 3 разложить наш массив и отображать карточки*/}
          {productsStore.productsArray.map((elm) => (
            <Card
              key={elm.id}
              captionSlot={elm.category.name}
              image={elm.images[0]}
              title={elm.title}
              subtitle={elm.description}
              contentSlot={elm.price + "$"}
              onClick={() => navigate(`/product/${elm.id}`)}
              actionSlot={
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // при нажатии на кнопку карточку открывать не надо
                  }}
                >
                  Add to cart
                </Button>
              }
            />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={productsStore.page}
        pagesTotal={productsStore.pagesTotal}
        onClick={(val) => {
          queryParamsStore.setParam("page", val.toString()); //  надо положить в url
          productsStore.setPage(val); //положить в стор
          productsStore.makeSearch(); //выполнить поиск
        }}
      />
    </div>
  );
});

export default Products;

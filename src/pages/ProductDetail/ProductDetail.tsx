import getProduct from "api/getProduct";
import getAllProducts from "api/getAllProducts";
import { Product } from "api/types";
import { useEffect, useState } from "react";
import Button from "components/Button";
import PrevIcon from "components/icons/PrevIcon";
import Card from "components/Card";

import styles from "./ProductDetail.module.scss";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  let id: number; //id of the element to show.

  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  if (query.has("id")) {
    id = Number(query.get("id"));
  } else {
    id = 1; //at least we will show some product.
  }

  const [productData, SetProductData] = useState<Product>();
  const [relatedProducts, SetRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getProduct(id);

      let category: number = result.category.id;
      //we need 3 related products of the same category
      // make a query and ask for 4 products instead.
      // one product might be the same as the current oune

      const relatedResult = await getAllProducts({
        limit: 4,
        categoryId: category,
      });

      SetProductData(result); //once we get the result we put in in state
      //after that component is re-rendered
      //in total there are 2 renders: initial, and then with data

      const relatedProducts_filtered = relatedResult.filter(
        (elm) => elm.id != id
      );

      SetRelatedProducts(relatedProducts_filtered);
    };
    fetch();
  }, []); //запускаем при загрузке, а id берем из строки

  return (
    <div className={styles.page}>
      <a className={styles.backButton} href="javascript:history.back()">
        <PrevIcon />
        Back
      </a>

      <div className={styles.cardInfo}>
        <img src={productData?.images[0]} alt={productData?.title} />
        <div className={styles.ProductDetail}>
          <h1>{productData?.title}</h1>
          <p className={styles.description}>{productData?.description}</p>
          <div className={styles.price}>${productData?.price}</div>

          <div className={styles.actionButtons}>
            <Button>Buy now</Button>
            <Button>Add to cart</Button>
          </div>
        </div>
      </div>

      <div className={styles.relatedItemsSection}>
        <h2>Related items</h2>
        <div className={styles.relatedItems}>
          {relatedProducts.slice(0, 3).map((elm) => (
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
    </div>
  );
};

export default ProductDetail;

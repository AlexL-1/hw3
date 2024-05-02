import getProduct from "api/getProduct";
import getAllProducts from "api/getAllProducts";
import { Product } from "api/types";
import { useEffect, useState } from "react";
import Button from "components/Button";
import PrevIcon from "components/icons/PrevIcon";
import Card from "components/Card";

import styles from "./ProductDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  let { id } = useParams(); //id of the element to show.

  const navigate = useNavigate();

  const [productData, setProductData] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getProduct(id);
      if (!result.isError) {
        const category: number = result.data.category.id;
        //надо 3 других продукта из той же категории, но мы запросим 4 на тот случай, если попадется текущий продукт

        const relatedResult = await getAllProducts({
          limit: 4,
          categoryId: category,
        });

        if (!relatedResult.isError) {
          const relatedProducts_filtered = relatedResult.data.filter(
            (elm) => elm.id != id
          );
          setRelatedProducts(relatedProducts_filtered);
        }

        setProductData(result.data); //положили продукт в state
      }
    };
    fetch();
  }, []); //запускаем при загрузке, а id берем из строки

  return (
    <div className={styles.page}>
      <a className={styles.backButton} href="javascript:history.back()">
        <PrevIcon />
        Back
      </a>

      {productData && ( //не следует показывать карточку, если нет данных
        <>
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
        </>
      )}
    </div>
  );
};

export default ProductDetail;

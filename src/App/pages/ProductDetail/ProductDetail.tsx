import { useEffect } from "react";
import Button from "components/Button";
import PrevIcon from "components/icons/PrevIcon";
import Card from "components/Card";

import styles from "./ProductDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import rootStore from "store/RootStore";
import { observer } from "mobx-react-lite";
import Carousel from "./Carousel";

const ProductDetail = observer(() => {
  const navigate = useNavigate();

  const productDetailStore = rootStore.productDetailStore;

  let { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      productDetailStore.setId(id);
    }
  }, [id]); //запускаем при загрузке, а id берем из строки

  return (
    <div className={styles.page}>
      <a className={styles.backButton} href="javascript:history.back()">
        <PrevIcon />
        Back
      </a>

      {productDetailStore.productData && ( //не следует показывать карточку, если нет данных
        <>
          <div className={styles.cardInfo}>
            <div className={styles.cardImg}>
              <Carousel
                images={productDetailStore.productData?.images}
                alt={productDetailStore.productData?.title}
              />
            </div>
            <div className={styles.ProductDetail}>
              <h1>{productDetailStore.productData?.title}</h1>
              <p className={styles.description}>
                {productDetailStore.productData?.description}
              </p>
              <div className={styles.price}>
                ${productDetailStore.productData?.price}
              </div>

              <div className={styles.actionButtons}>
                <Button>Buy now</Button>
                <Button>Add to cart</Button>
              </div>
            </div>
          </div>

          <div className={styles.relatedItemsSection}>
            <h2>Related items</h2>
            <div className={styles.relatedItems}>
              {productDetailStore.relatedProducts.slice(0, 3).map((elm) => (
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
        </>
      )}
    </div>
  );
});

export default ProductDetail;

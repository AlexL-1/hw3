import Loader from "components/Loader";
import "./Products.scss"; // импорт стилей
import Navbar from "components/Navbar";

// код компонента
const Products = () => {
  return (
    <>
      <Loader />
      <Navbar />
      <div className="Products">All products here</div>
    </>
  );
};

// Экспортируем компонент
export default Products;

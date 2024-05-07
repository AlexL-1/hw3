import { Route, Routes, useLocation, useParams } from "react-router-dom";
import "styles/index.scss";
import Products from "./pages/Products";
import Navbar from "components/Navbar";
import ProductDetail from "./pages/ProductDetail";
import rootStore from "store/RootStore";

const App = () => {
  // useLocation()работает только внутри BrowserRouter, поэтому поправили в main.tsx
  rootStore.queryParamsStore.setSearch(useLocation().search);

  // useParams() работает только внути Routes
  // поэтому никаких путей вида /:category/:title
  // будет классическая строка ?search и будем разбирать строку вручную другой библиотекой внутри store
  //оставим только для продукта, но у него никаких query параметров нет, только путь.

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        {/* <Route
          path="/products/category:category?/title:title?"
          element={<Products />}
        /> */}
        <Route path="/product/:id" element={<ProductDetail />}></Route>
      </Routes>
    </>
  );
};

// Экспортируем компонент
export default App;

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./styles/index.scss"; // импорт стилей
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar";
import ProductDetail from "./pages/ProductDetail";

// код компонента
//по умолчанию открывается страница всех продуктов
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product">
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

// Экспортируем компонент
export default App;

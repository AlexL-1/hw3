import { BrowserRouter, Route, Routes } from "react-router-dom";
import "styles/index.scss";
import Products from "./pages/Products";
import Navbar from "components/Navbar";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product">
          <Route path=":id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

// Экспортируем компонент
export default App;

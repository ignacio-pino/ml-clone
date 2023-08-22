import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./pages/Products";
import Item from "./pages/Item";
import Sales from "./pages/Sales";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="item" element={<Item />} />
        <Route path="sales" element={<Sales />} />
      </Routes>
    </BrowserRouter>
  );
}

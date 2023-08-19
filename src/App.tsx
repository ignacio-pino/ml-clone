import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./pages/Products";
import Header from "./components/modules/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

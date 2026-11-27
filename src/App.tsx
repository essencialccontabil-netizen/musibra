import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CatalogProvider } from "./api/CatalogContext";
import { CartProvider } from "./cart/CartContext";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";

export default function App() {
  return (
    <CatalogProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="catalogo" element={<CatalogPage />} />
              <Route path="categorias" element={<CategoriesPage />} />
              <Route path="categoria/:id" element={<CategoryPage />} />
              <Route path="produto/:slug" element={<ProductPage />} />
              <Route path="carrinho" element={<CartPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </CatalogProvider>
  );
}

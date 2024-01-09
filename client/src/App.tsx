import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { useEffect } from "react";

import Header from "./layout/Header";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Product from "./pages/Product";
import Cafe from "./pages/Cafe";
import Menu from "./pages/Menu";
import Banquet from "./pages/Banquet";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Catering from "./pages/Catering";
import Contact from "./pages/Contact";
import Notif from "./components/Notif";
import NotFound from "./pages/NotFound";
import Footer from "./layout/Footer";
import Admin from "./pages/Admin";

import Button from "./components/Button";

import useCartData from "./hooks/useCartData";

import * as storage from "./utils/localStorage";

import { Settings } from "./ts/types";

const fallbackRender = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role="alert">
      <p>Something went wrong: {error}</p>
      <Button
        handleClick={() => {
          window.location.reload();
          resetErrorBoundary();
        }}
      >
        Refresh
      </Button>
    </div>
  );
};

const App = () => {
  const { modifyCartData } = useCartData();

  useEffect(() => {
    const cart = storage.getCart();

    if (cart) {
      const now = new Date();
      const cartExpirationDate = new Date(cart.expiresAt);

      if (now.getTime() > cartExpirationDate.getTime()) {
        modifyCartData(() => storage.clearCart());
      }
    }
  }, [modifyCartData]);

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <main style={{ position: "relative" }}>
        <>
          <Header />
          <Notif />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/market" element={<Market />} />
            <Route path="/cafe" element={<Cafe />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/banquet" element={<Banquet />} />
            <Route path="/success" element={<Success />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id">
              <Route path=":slug" element={<Product />} />
              <Route path="" element={<Product />} />
            </Route>
            <Route path="/catering" element={<Catering />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      </main>
    </ErrorBoundary>
  );
};

export default App;

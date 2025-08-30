"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        qty: prev[item.id] ? prev[item.id].qty + 1 : 1,
      },
    }));
  };

  const increaseQty = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: { ...prev[id], qty: prev[id].qty + 1 },
    }));
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const newQty = prev[id].qty - 1;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...prev[id], qty: newQty } };
    });
  };

  const cartHasItems = Object.keys(cart).length > 0;

  const clearCart = () => setCart({});


  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, cartHasItems,clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    if (product.stock > 0) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item._id === product._id);
        if (existingItem && existingItem.quantity < product.stock) {
          toast.success('Item added to cart');
          return prevItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else if (!existingItem) {
          toast.success('Item added to cart');
          return [...prevItems, { ...product, quantity: 1 }];
        } else {
          toast.error('Out of Stock');
          return prevItems;
        }
      });
    } else {
      toast.error('Out of Stock');
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

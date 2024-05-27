// CartContext.jsx
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
          // If the item already exists in the cart and stock is available, update its quantity
          return prevItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else if (!existingItem) {
          // If the item doesn't exist in the cart, add it with quantity 1
          return [...prevItems, { ...product, quantity: 1 }];
        } else {
          // Otherwise, show "Out of Stock" message
          toast.error('Out of Stock');
          return prevItems;
        }
      });
    } else {
      toast.error('Out of Stock');
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter(item => item._id !== productId);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

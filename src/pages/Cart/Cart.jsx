import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { AuthContext } from '../../AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Cart.scss';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, setCartItems, addToCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const handlePurchase = async (product) => {
    if (!product || !product._id) {
      console.error("Invalid product data", product);
      return;
    }

    try {
      const response = await axios.put(`https://nexus2024.onrender.com/api/update/${product._id}`, {
        stock: product.stock - product.quantity // Decrease stock by the quantity purchased
      });

      if (response.status === 200) {
        console.log(`Updated stock for product ID: ${product._id}`);
        toast.success(`Purchased ${product.title} successfully!`);
      } else {
        console.error(`Failed to purchase ${product.title}:`, response.data);
        toast.error(`Failed to purchase ${product.title}`);
      }

      // Update the state to reflect the stock change immediately
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === product._id ? { ...item, stock: item.stock - product.quantity } : item
        )
      );
    } catch (error) {
      console.error(`Error updating item ${product.title}:`, error.response ? error.response.data : error.message);
      toast.error(`Error updating item ${product.title}`);
    }
  };

  const handleAddToCart = (product) => {
    if (user) {
      if (product.stock > 0) {
        addToCart(product);
      } else {
        toast.error("This product is out of stock.");
      }
    } else {
      toast.error("You need an account before adding to the cart");
    }
  };

  const handlePurchaseAll = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    console.log('Items Purchased:', cartItems);

    for (const item of cartItems) {
      await handlePurchase(item);
    }

    clearCart();
    toast.success('Purchase successful! All items have been purchased.');
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item._id}>
            <div className="product-card">
              <div className="product-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="product-info">
                <h3>{item.title}</h3>
                <p className="description">{item.description}</p>
                <p className="price">Price: &#8356;{item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
              {item.stock === 0 && <span className="out-of-stock-banner">Out of Stock</span>}
            </div>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && (
        <button className="purchase-btn" onClick={handlePurchaseAll}>Purchase</button>
      )}
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
    </div>
  );
};

export default Cart;

import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const handlePurchase = async () => {
    try {
      console.log('Items Purchased:', cartItems);

      // Handle Windows items
      for (const item of cartItems) {
        if (item.category === 'windows') {
          const apiUrl = `https://nexus2024.onrender.com/api/windows/${item._id}/reduce-stock`;
          try {
            // Send the API request to update stock
            const response = await axios.post(apiUrl, {
              quantity: item.quantity,
            });

            // Handle the response from the API
            if (response.status === 200) {
              toast.success(`Purchased ${item.title} successfully!`);
            } else {
              console.error(`Failed to purchase ${item.title}:`, response.data);
              toast.error(`Failed to purchase ${item.title}`);
            }
          } catch (apiError) {
            console.error(`Error updating item ${item.title}:`, apiError.response ? apiError.response.data : apiError.message);
            toast.error(`Error updating item ${item.title}`);
          }
        }
      }

      // Handle Macs items
      for (const item of cartItems) {
        if (item.category === 'macs') {
          const apiUrl = `https://nexus2024.onrender.com/api/macs/${item._id}/reduce-stock`;
          try {
            // Send the API request to update stock
            const response = await axios.post(apiUrl, {
              quantity: item.quantity,
            });

            // Handle the response from the API
            if (response.status === 200) {
              toast.success(`Purchased ${item.title} successfully!`);
            } else {
              console.error(`Failed to purchase ${item.title}:`, response.data);
              toast.error(`Failed to purchase ${item.title}`);
            }
          } catch (apiError) {
            console.error(`Error updating item ${item.title}:`, apiError.response ? apiError.response.data : apiError.message);
            toast.error(`Error updating item ${item.title}`);
          }
        }
      }

      // Clear the cart after successful purchase
      clearCart();
      toast.success('Purchase successful! All items have been purchased.');
    } catch (error) {
      console.error('Error purchasing items:', error);
      // Display an error message
      toast.error('Error purchasing items');
    }
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
                <p className="quantity">Quantity: {item.quantity}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && (
        <button className="purchase-btn" onClick={handlePurchase}>Purchase</button>
      )}
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
    </div>
  );
};

export default Cart;

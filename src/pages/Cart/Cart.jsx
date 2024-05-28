import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { AuthContext } from '../../AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Cart.scss';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const handlePurchase = async () => {
    if (!user) {
      toast.error('You must be logged in to make a purchase.');
      return;
    }

    try {
      console.log('Items Purchased:', cartItems);

      for (const item of cartItems) {
        const apiUrl = item.category === 'windows'
          ? `https://nexus2024.onrender.com/api/windows/${item._id}/reduce-stock`
          : `https://nexus2024.onrender.com/api/macs/${item._id}/reduce-stock`;

        try {
          const response = await axios.post(apiUrl, {
            quantity: item.quantity,
          });

          if (response.status === 200) {
            toast.success(`Purchased ${item.title} successfully!`);
          } else {
            console.error(`Failed to purchase ${item.title}:`, response.data);
            // Comment out or remove the error toast message
            // toast.error(`Failed to purchase ${item.title}`);
          }
        } catch (apiError) {
          console.error(`Error updating item ${item.title}:`, apiError.response ? apiError.response.data : apiError.message);
          // Comment out or remove the error toast message
          // toast.error(`Error updating item ${item.title}`);
        }
      }

      clearCart();
      toast.success('Purchase successful! All items have been purchased.');
    } catch (error) {
      console.error('Error purchasing items:', error);
      // Comment out or remove the error toast message
      // toast.error('Error purchasing items');
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
                <div className="quantity-control">
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
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







import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, product, handleUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedProduct);
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={updatedProduct.title} onChange={handleChange} />

          <label>Description:</label>
          <textarea name="description" value={updatedProduct.description} onChange={handleChange} />

          <label>Price:</label>
          <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} />

          <label>Stock:</label>
          <input type="number" name="stock" value={updatedProduct.stock} onChange={handleChange} />

          <label>Image URL:</label>
          <input type="text" name="image" value={updatedProduct.image} onChange={handleChange} />

          <label>Ratings:</label>
          <input type="text" name="ratings" value={updatedProduct.ratings} onChange={handleChange} />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

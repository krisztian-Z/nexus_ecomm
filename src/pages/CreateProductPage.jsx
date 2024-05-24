import React, { useState } from 'react';
import axios from 'axios';
import './CreateProductPage.css';  

const CreateProductPage = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', productName);
    formData.append('price', productPrice);
    formData.append('description', productDescription);
    formData.append('stock', productStock);
    if (productImage) {
      formData.append('image', productImage);
    }

    try {
      const response = await axios.post('https://nexus2024.onrender.com/api/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product created:', response.data);
    } catch (error) {
      console.error('There was an error creating the product!', error);
    }
  };

  return (
    <div className="create-product-container">
      <h2>Create a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label>Product Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Product Description:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Product Stock:</label>
          <input
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
          />
        </div>
        <div>
          <label>Product Image:</label>
          <input
            type="file"
            onChange={(e) => setProductImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProductPage;

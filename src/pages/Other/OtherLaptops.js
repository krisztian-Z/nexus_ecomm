import React, { useState, useEffect } from 'react';
import './OtherLaptops.css';

const ProductCard = ({ product }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.title}  />
      <h2>{product.title}</h2>
      <p>
        {showMore ? product.description : `${product.description.substring(0, 100)}...`}
        <span onClick={toggleShowMore} style={{ color: 'blue', cursor: 'pointer' }}>
          {showMore ? ' Read Less' : ' Read More...'}
        </span>
      </p>
      <p>Price: &#8364;{product.price}</p>
      <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
    </div>
  );
};

const OtherLaptops = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="products-title">Other Available Laptops </h1>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OtherLaptops;
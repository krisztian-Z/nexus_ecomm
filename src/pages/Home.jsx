import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./Cart/CartContext"; 
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://nexus2024.onrender.com/api/all");
      const data = response.data;
      const highRatedProducts = data
        .filter((product) => parseFloat(product.ratings.split("/")[0]) >= 4.9)
        .slice(0, 5); // Display up to 5 products
      setProducts(highRatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePurchase = async (product) => {
    const quantity = 1; // Example: purchase 1 item
    try {
      const response = await axios.post(`https://nexus2024.onrender.com/api/update-stock/${product._id}`, { quantity });
      const updatedProduct = response.data;

      setProducts((prevProducts) =>
        prevProducts.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
    } catch (error) {
      console.error("Error updating product stock:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="homepage">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Welcome to Nexus</h1>
          <p>
            This is the Nexus company homepage, your one-stop solution for
            laptops and mobiles.
          </p>
          <button onClick={() => navigate("/products")}>Shop Now</button>
          <button onClick={() => navigate("/create-product")}>Create Product</button>
        </div>
        <img src="/images/laptop.png" alt="Laptop" className="laptop-img" />
      </div>
      <section className="best-deals">
        <h2>Best Deals</h2>
        <Slider {...settings} className="slider">
          {products.map((product) => (
            <div className="deal-card" key={product._id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="ratings">Rating: {product.ratings}</p>
              <p className="stock">Stock: {product.stock}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default Home;







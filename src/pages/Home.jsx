import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./Cart/CartContext"; 
import axios from 'axios';
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { CustomPrevArrow, CustomNextArrow } from "../components/CustomArrows";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
    checkAdminStatus();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://nexus2024.onrender.com/api/all");
      const data = response.data;
      console.log("Fetched products:", data); // Log the fetched data
      const highRatedProducts = data
        .filter((product) => {
          const rating = product.ratings ? parseFloat(product.ratings.split("/")[0]) : 0;
          return rating >= 4.9;
        })
        .slice(0, 5); // Display up to 5 products
      console.log("High rated products:", highRatedProducts); // Log the filtered products
      setProducts(highRatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const checkAdminStatus = () => {
    const user = auth.currentUser;
    if (user) {
      const adminEmails = [
        process.env.REACT_APP_ADMIN_EMAIL_1,
        process.env.REACT_APP_ADMIN_EMAIL_2,
      ];
      if (adminEmails.includes(user.email)) {
        setIsAdmin(true);
      }
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
      toast.success("Purchase successful!"); // Showing success toast notification
    } catch (error) {
      console.error("Error updating product stock:", error);
      toast.error("Purchase failed. Please try again."); // Showing error toast notification
    }
  };

  const handleAddToCart = (product) => {
    const user = auth.currentUser;
    if (user) {
      if (product.stock > 0) {
        addToCart(product);
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("This product is out of stock.");
      }
    } else {
      toast.error("You need an account before adding a product into the cart");
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
    prevArrow: <CustomPrevArrow />, // Use custom prev arrow
    nextArrow: <CustomNextArrow /> // Use custom next arrow
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
          {isAdmin && <button onClick={() => navigate("/create-product")} style={{ marginLeft: "10px" }}>Create Product</button>}
        </div>
        <img src="/images/laptop.png" alt="Laptop" className="laptop-img" />
      </div>
      <section className="best-deals">
        <h2>Best Deals</h2>
        <Slider {...settings} className="slider">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="deal-card" key={product._id}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p className="ratings">Rating: {product.ratings}</p>
                <p className="stock">Stock: {product.stock}</p>
                {product.stock === 0 && <span className="out-of-stock-banner">Out of Stock</span>}
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                {isAdmin && <button onClick={() => handlePurchase(product)}>Purchase</button>}
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </Slider>
      </section>
    </div>
  );
};

export default Home;

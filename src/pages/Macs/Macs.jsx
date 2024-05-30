import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../Cart/CartContext'; // Import the CartContext
import '../Other/OtherLaptops.css';
import { db, auth } from '../../firebase'; 
import { writeBatch, doc, updateDoc, increment } from "firebase/firestore"; // Import FieldValue for updating stock
import { toast } from 'react-toastify'; // Importing toast from react-toastify

const Macs = () => {
  const { addToCart } = useContext(CartContext); // Access the addToCart function from CartContext
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  useEffect(() => {
    fetchProducts();
    checkAdminStatus();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://nexus2024.onrender.com/api/macs');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);

      const batch = writeBatch(db);
      data.forEach(product => {
        const docRef = doc(db, 'macs', product._id); 
        batch.set(docRef, product);
      });
      await batch.commit();

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkAdminStatus = () => {
    const user = auth.currentUser;
    if (user) {
      const adminEmails = [
        process.env.REACT_APP_ADMIN_EMAIL_1,
        process.env.REACT_APP_ADMIN_EMAIL_2,
        // Add more admin email addresses if needed
      ];
      if (adminEmails.includes(user.email)) {
        setIsAdmin(true);
      }
    }
  };

  const handlePurchase = async (product) => {
    try {
      const productRef = doc(db, 'macs', product._id);
      await updateDoc(productRef, {
        stock: increment(-1) // Decrease stock by 1 when purchased
      });
      // Update the state to reflect the stock change immediately
      setProducts((prevProducts) => 
        prevProducts.map((p) => 
          p._id === product._id ? { ...p, stock: p.stock - 1 } : p
        )
      );
      //toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Error updating product stock:", error);
      toast.error("Failed to update product stock.");
    }
  };

  const handleAddToCart = (product) => {
    const user = auth.currentUser;
    if (user) {
      if (product.stock > 0) {
        addToCart(product);
        handlePurchase(product);
      } else {
        toast.error("This product is out of stock.");
      }
    } else {
      toast.error("You need an account before adding to the cart");
    }
  };

  const handleDelete = async (productId) => {
    try {
        console.log(`Attempting to delete product with ID: ${productId}`);
        const response = await fetch(`https://nexus2024.onrender.com/api/delete/${productId}`, {
            method: 'DELETE',
        });

        const responseData = await response.json(); // Parse the response data

        if (!response.ok) {
            throw new Error(`Failed to delete product: ${response.status} - ${responseData.message}`);
        }

        // Update the state to reflect the deletion
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
        );
        setFilteredProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
        );
        toast.success("Product deleted successfully!");
    } catch (error) {
        console.error("Error deleting product:", error);
        toast.error(`Failed to delete product: ${error.message}`);
    }
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="title-and-search">
        <h1 className="products-title">MacBook Laptops</h1>
        <input
          type="text"
          placeholder="Search for products..."
          onChange={(event) => {
            const value = event.target.value;
            setSearchTerm(value);
            if (value.trim() === "") {
              setFilteredProducts(products);
            } else {
              const filtered = products.filter(product =>
                product.title.toLowerCase().includes(value.toLowerCase())
              );
              setFilteredProducts(filtered);
            }
          }}
          value={searchTerm}
          className="search-input"
        />
      </div>
      <div className="products-container">
        {filteredProducts.map((product) => {
          let ratingValue = 0;
          let totalReviews = 0;
          if (product.ratings) {
            const ratingsArray = product.ratings.split('/');
            if (ratingsArray.length > 0) {
              ratingValue = parseFloat(ratingsArray[0]);
              const reviewsMatch = product.ratings.match(/\((\d+)\sreviews\)/);
              if (reviewsMatch) {
                totalReviews = reviewsMatch[1];
              }
            }
          }
          const starPercentage = (ratingValue / 5) * 100;
          const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
          return (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <h2>{product.title}</h2>
                <p className="description">{product.description}</p>
                <p className="price">Price: &#8356;{product.price}</p>
                <p className="stock">Stock: {product.stock}</p>
                <div className="rating">
                  <div className="star-ratings-css">
                    <div className="star-ratings-css-top" style={{width: starPercentageRounded}}>
                      <span>★★★★★</span>
                    </div>
                    <div className="star-ratings-css-bottom">
                      <span>★★★★★</span>
                    </div>
                  </div>
                  <span className='total'>({totalReviews} reviews)</span>
                </div>
                {isAdmin && (
                  <div className='updateicons'>
                    <button className='updateButton'>Update</button>
                    <button
                      style={{ backgroundColor: "rgb(211, 48, 48)" }}
                      className='updateButton'
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
                {!isAdmin && (
                  <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Macs;





// import React, { useState, useEffect, useContext } from 'react';
// import { CartContext } from '../Cart/CartContext'; // Import the CartContext
// import '../Other/OtherLaptops.css';
// import { db, auth } from '../../firebase'; 
// import { writeBatch, doc, updateDoc, increment } from "firebase/firestore"; // Import FieldValue for updating stock
// import { toast } from 'react-toastify'; // Importing toast from react-toastify

// const Macs = () => {
//   const { addToCart } = useContext(CartContext); // Access the addToCart function from CartContext
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

//   useEffect(() => {
//     fetchProducts();
//     checkAdminStatus();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://nexus2024.onrender.com/api/macs');
//       if (!response.ok) {
//         throw new Error('Failed to fetch');
//       }
//       const data = await response.json();
//       setProducts(data);
//       setFilteredProducts(data);

//       const batch = writeBatch(db);
//       data.forEach(product => {
//         const docRef = doc(db, 'macs', product._id); 
//         batch.set(docRef, product);
//       });
//       await batch.commit();

//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkAdminStatus = () => {
//     const user = auth.currentUser;
//     if (user) {
//       const adminEmails = [
//         process.env.REACT_APP_ADMIN_EMAIL_1,
//         process.env.REACT_APP_ADMIN_EMAIL_2,
//         // Add more admin email addresses if needed
//       ];
//       if (adminEmails.includes(user.email)) {
//         setIsAdmin(true);
//       }
//     }
//   };

//   const handlePurchase = async (product) => {
//     try {
//       const productRef = doc(db, 'macs', product._id);
//       await updateDoc(productRef, {
//         stock: increment(-1) // Decrease stock by 1 when purchased
//       });
//       // Update the state to reflect the stock change immediately
//       setProducts((prevProducts) => 
//         prevProducts.map((p) => 
//           p._id === product._id ? { ...p, stock: p.stock - 1 } : p
//         )
//       );
//       //toast.success("Product added to cart successfully!");
//     } catch (error) {
//       console.error("Error updating product stock:", error);
//       toast.error("Failed to update product stock.");
//     }
//   };

//   const handleAddToCart = (product) => {
//     const user = auth.currentUser;
//     if (user) {
//       if (product.stock > 0) {
//         addToCart(product);
//         handlePurchase(product);
//       } else {
//         toast.error("This product is out of stock.");
//       }
//     } else {
//       toast.error("You need an account before adding to the cart");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <div className="title-and-search">
//         <h1 className="products-title">MacBook Laptops</h1>
//         <input
//           type="text"
//           placeholder="Search for products..."
//           onChange={(event) => {
//             const value = event.target.value;
//             setSearchTerm(value);
//             if (value.trim() === "") {
//               setFilteredProducts(products);
//             } else {
//               const filtered = products.filter(product =>
//                 product.title.toLowerCase().includes(value.toLowerCase())
//               );
//               setFilteredProducts(filtered);
//             }
//           }}
//           value={searchTerm}
//           className="search-input"
//         />
//       </div>
//       <div className="products-container">
//         {filteredProducts.map((product) => {
//           let ratingValue = 0;
//           let totalReviews = 0;
//           if (product.ratings) {
//             const ratingsArray = product.ratings.split('/');
//             if (ratingsArray.length > 0) {
//               ratingValue = parseFloat(ratingsArray[0]);
//               const reviewsMatch = product.ratings.match(/\((\d+)\sreviews\)/);
//               if (reviewsMatch) {
//                 totalReviews = reviewsMatch[1];
//               }
//             }
//           }
//           const starPercentage = (ratingValue / 5) * 100;
//           const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
//           return (
//             <div className="product-card" key={product._id}>
//               <div className="product-image">
//                 <img src={product.image} alt={product.title} />
//               </div>
//               <div className="product-info">
//                 <h2>{product.title}</h2>
//                 <p className="description">{product.description}</p>
//                 <p className="price">Price: &#8356;{product.price}</p>
//                 <p className="stock">Stock: {product.stock}</p>
//                 <div className="rating">
//                   <div className="star-ratings-css">
//                     <div className="star-ratings-css-top" style={{width: starPercentageRounded}}>
//                       <span>★★★★★</span>
//                     </div>
//                     <div className="star-ratings-css-bottom">
//                       <span>★★★★★</span>
//                     </div>
//                   </div>
//                   <span className='total'>({totalReviews} reviews)</span>
//                 </div>
//                 {isAdmin && (
//                   <div className='updateicons'>
//                     <button className='updateButton'>Update</button>
//                     <button style={{backgroundColor: "rgb(211, 48, 48)"}} className='updateButton'>Delete</button>
//                   </div>
//                 )}
//                 {!isAdmin && (
//                   <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Macs;





// import React, { useState, useEffect, useContext } from 'react';
// import { CartContext } from '../Cart/CartContext'; // Import the CartContext
// import '../Other/OtherLaptops.css';
// import { db, auth } from '../../firebase'; 
// import { writeBatch, doc, updateDoc, increment } from "firebase/firestore"; // Import FieldValue for updating stock
// import { toast } from 'react-toastify'; // Importing toast from react-toastify

// const Macs = () => {
//   const { addToCart } = useContext(CartContext); // Access the addToCart function from CartContext
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

//   useEffect(() => {
//     fetchProducts();
//     checkAdminStatus();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://nexus2024.onrender.com/api/macs');
//       if (!response.ok) {
//         throw new Error('Failed to fetch');
//       }
//       const data = await response.json();
//       setProducts(data);
//       setFilteredProducts(data);

//       const batch = writeBatch(db);
//       data.forEach(product => {
//         const docRef = doc(db, 'macs', product._id); 
//         batch.set(docRef, product);
//       });
//       await batch.commit();

//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkAdminStatus = () => {
//     const user = auth.currentUser;
//     if (user) {
//       const adminEmails = [
//         process.env.REACT_APP_ADMIN_EMAIL_1,
//         process.env.REACT_APP_ADMIN_EMAIL_2,
//         // Add more admin email addresses if needed
//       ];
//       if (adminEmails.includes(user.email)) {
//         setIsAdmin(true);
//       }
//     }
//   };

//   const handlePurchase = async (product) => {
//     try {
//       const productRef = doc(db, 'macs', product._id);
//       await updateDoc(productRef, {
//         stock: increment(-1) // Decrease stock by 1 when purchased
//       });
//       // Update the state to reflect the stock change immediately
//       setProducts((prevProducts) => 
//         prevProducts.map((p) => 
//           p._id === product._id ? { ...p, stock: p.stock - 1 } : p
//         )
//       );
//       //toast.success("Product added to cart successfully!");
//     } catch (error) {
//       console.error("Error updating product stock:", error);
//       toast.error("Failed to update product stock.");
//     }
//   };

//   const handleAddToCart = (product) => {
//     const user = auth.currentUser;
//     if (user) {
//       if (product.stock > 0) {
//         addToCart(product);
//         handlePurchase(product);
//       } else {
//         toast.error("This product is out of stock.");
//       }
//     } else {
//       toast.error("You need an account before adding to the cart");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <div className="title-and-search">
//         <h1 className="products-title">MacBook Laptops</h1>
//         <input
//           type="text"
//           placeholder="Search for products..."
//           onChange={(event) => {
//             const value = event.target.value;
//             setSearchTerm(value);
//             if (value.trim() === "") {
//               setFilteredProducts(products);
//             } else {
//               const filtered = products.filter(product =>
//                 product.title.toLowerCase().includes(value.toLowerCase())
//               );
//               setFilteredProducts(filtered);
//             }
//           }}
//           value={searchTerm}
//           className="search-input"
//         />
//       </div>
//       <div className="products-container">
//         {filteredProducts.map((product) => {
//           let ratingValue = 0;
//           let totalReviews = 0;
//           if (product.ratings) {
//             const ratingsArray = product.ratings.split('/');
//             if (ratingsArray.length > 0) {
//               ratingValue = parseFloat(ratingsArray[0]);
//               const reviewsMatch = product.ratings.match(/\((\d+)\sreviews\)/);
//               if (reviewsMatch) {
//                 totalReviews = reviewsMatch[1];
//               }
//             }
//           }
//           const starPercentage = (ratingValue / 5) * 100;
//           const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
//           return (
//             <div className="product-card" key={product._id}>
//               <div className="product-image">
//                 <img src={product.image} alt={product.title} />
//               </div>
//               <div className="product-info">
//                 <h2>{product.title}</h2>
//                 <p className="description">{product.description}</p>
//                 <p className="price">Price: &#8356;{product.price}</p>
//                 <p className="stock">Stock: {product.stock}</p>
//                 <div className="rating">
//                   <div className="star-ratings-css">
//                     <div className="star-ratings-css-top" style={{width: starPercentageRounded}}>
//                       <span>★★★★★</span>
//                     </div>
//                     <div className="star-ratings-css-bottom">
//                       <span>★★★★★</span>
//                     </div>
//                   </div>
//                   <span className='total'>({totalReviews} reviews)</span>
//                 </div>
//                 {isAdmin && (
//                   <div className='updateicons'>
//                     <button className='updateButton'>Update</button>
//                     <button style={{backgroundColor: "rgb(211, 48, 48)"}} className='updateButton'>Delete</button>
//                   </div>
//                 )}
//                 <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Macs;












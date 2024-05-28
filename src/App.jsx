// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./style.scss";
import "./media-query.css";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Laptops from "./pages/Products/Laptops";
import NavigationBar from "./components/navigation/NavigationBar";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound";
import Scroll from "./components/Scroll";
import Footer from "./components/Footer/Footer";
import Macs from './pages/Macs/Macs';
import Other from './pages/Other/OtherLaptops';
import Cart from "./pages/Cart/Cart"; 
import { CartProvider } from "./pages/Cart/CartContext"; 
import CreateProductPage from "./pages/CreateProductPage";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider

library.add(fab, faShoppingCart);

function App() {
  const [active, setActive] = useState("auth");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/");
    });
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <NavigationBar
            setActive={setActive}
            active={active}
            user={user}
            handleLogout={handleLogout}
          />
          <Scroll />
          <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            <Route path="/" element={<Home setActive={setActive} active={active} user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Laptops />} />
            <Route path="/auth" element={<Auth setActive={setActive} setUser={setUser} />} />
            <Route path="/other" element={<Other />} />
            <Route path="/macs" element={<Macs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/create-product" element={<CreateProductPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;







// // src/App.jsx
// import React, { useState, useEffect } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { auth } from "./firebase";
// import { signOut } from "firebase/auth";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// import "react-toastify/dist/ReactToastify.css";
// import "./App.css";
// import "./style.scss";
// import "./media-query.css";

// import Auth from "./pages/Auth";
// import Home from "./pages/Home";
// import Laptops from "./pages/Products/Laptops";
// import NavigationBar from "./components/navigation/NavigationBar";
// import About from "./pages/About/About";
// import NotFound from "./pages/NotFound";
// import Scroll from "./components/Scroll";
// import Footer from "./components/Footer/Footer";
// import Macs from './pages/Macs/Macs';
// import Other from './pages/Other/OtherLaptops';
// import Cart from "./pages/Cart/Cart"; 
// import { CartProvider } from "./pages/Cart/CartContext"; 
// import CreateProductPage from "./pages/CreateProductPage";
// import { AuthProvider } from "./AuthContext"; // Import AuthProvider

// library.add(fab, faShoppingCart);

// function App() {
//   const [active, setActive] = useState("auth");
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         setUser(authUser);
//       } else {
//         setUser(null);
//       }
//     });
//   }, []);

//   const handleLogout = () => {
//     signOut(auth).then(() => {
//       setUser(null);
//       setActive("login");
//       navigate("/");
//     });
//   };

//   return (
//     <AuthProvider>
//       <CartProvider>
//         <div className="App">
//           <NavigationBar
//             setActive={setActive}
//             active={active}
//             user={user}
//             handleLogout={handleLogout}
//           />
//           <Scroll />
//           <ToastContainer position="top-center" />
//           <Routes>
//             <Route path="/" element={<Home setActive={setActive} active={active} user={user} />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/products" element={<Laptops />} />
//             <Route path="/auth" element={<Auth setActive={setActive} setUser={setUser} />} />
//             <Route path="/other" element={<Other />} />
//             <Route path="/macs" element={<Macs />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/create-product" element={<CreateProductPage />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//           <Footer />
//         </div>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;

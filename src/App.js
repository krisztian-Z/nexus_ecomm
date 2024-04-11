import Auth from "./pages/Auth";
import { useState, useEffect } from "react";
import "./App.css";
import "./style.scss";
import "./media-query.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.js";  
import Laptops from "./pages/Products/Laptops.js";
import NavigationBar from "./components/navigation/NavigationBar";
import About from "./pages/About/About.js";
import NotFound from "./pages/NotFound";
import Scroll from "./components/Scroll.js";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Footer from "./components/Footer/Footer.jsx";
//import Trending from "./components/Trending/Trending";
//import Dashboard from './components/Dashboard/Dashboard'; 
import Macs from './pages/Macs/Macs.js';
import Other from './pages/Other/OtherLaptops.js';
import LaptopsPage from "./pages/Laptops/Laptops.js";




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

  // Logout logic
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/");
    });
  };

  return (
    <div className="App">
      <NavigationBar
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />

      <Scroll />
      <ToastContainer position="top-center" />

      <Routes>
        <Route path="/" element={<Home setActive={setActive} active={active} user={user} />} />  
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Laptops />} />
        <Route path="/auth" element={<Auth setActive={setActive} setUser={setUser} />} />
        
        <Route path="/other" element={<Other />} />
        <Route path="/macs" element={<Macs />} />
      
        <Route path="/laptops" element={<LaptopsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

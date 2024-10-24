/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/Theme";
import { useEffect, useState } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Verify from "./pages/Verify";
import CreateReview from "./pages/CreateReview";
import Privacy from "./pages/Privacy";
import GoToTop from "./components/GoToTop";
import Conditions from "./pages/Conditions";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";

const App = () => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });
  // Now to add functionality in the method that we have defined in the
  //context what we need to do here is we need to declare function with
  //same name as in the context and the functionality will be automatically added in those functions.
  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  //But how do we change the theme
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);
  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className="dark:bg-black px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/create-review/:productId" element={<CreateReview />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/reset-password/:secret_token"
            element={<ResetPassword />}
          />
          <Route
            path="/:userId/verify-email/:verificationToken"
            element={<VerifyEmail />}
          />
        </Routes>
        <Footer />
        <div className="fixed bottom-4 right-4">
          <GoToTop />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;

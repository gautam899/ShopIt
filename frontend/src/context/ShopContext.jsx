/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});
  const [wishlistItems, setWishlistItems] = useState([{}]);
  const [allOrders, setAllOrders] = useState([]);
  const [items, setItems] = useState([{}]);

  const addCartItem = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    }
    let copyCart = structuredClone(cartItem);
    if (copyCart[itemId]) {
      if (copyCart[itemId][size]) {
        copyCart[itemId][size] += 1;
      } else {
        copyCart[itemId][size] = 1;
      }
    } else {
      copyCart[itemId] = {};
      copyCart[itemId][size] = 1;
    }

    setCartItem(copyCart);
    localStorage.setItem("cart", JSON.stringify(copyCart));

    if (token) {
      try {
        const response = await axios.post(
          `${backend_url}/api/cart/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          toast.success("Item added to cart Successfully");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItem(JSON.parse(savedCart));
    }
  }, []);

  const updateCartNumber = async () => {
    //to update the cart item we need to send a request to the
    let count = 0;
    for (let itemId in cartItem) {
      for (let size in cartItem[itemId]) {
        count += cartItem[itemId][size];
      }
    }
    // console.log(count);
    setCartCount(count);
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let copyCart = structuredClone(cartItem);
    copyCart[itemId][size] = quantity;
    setCartItem(copyCart);
    if (token) {
      try {
        await axios.post(
          `${backend_url}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const findTotalPrice = async () => {
    let total = 0;

    for (const itemId in cartItem) {
      let product = products.find((product) => product._id === itemId);
      for (const size in cartItem[itemId]) {
        try {
          if (cartItem[itemId][size] > 0) {
            total += product.price * cartItem[itemId][size];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    return total;
  };

  const getProductsData = async () => {
    //we will fetch the products from the backend here.
    try {
      const response = await axios.get(`${backend_url}/api/product/list`);
      // console.log(response);
      if (response.status === 200) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      console.log("From the shop context" + error.message);
      toast.error(error.message);
    }
  };

  const addToWishlist = async (productId, size) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/wishlist/addToWishlist`,
        {
          productId,
          size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setWishlistItems((prevWishlist) => [
          ...prevWishlist,
          { productId, size },
        ]);
        await updateQuantity(productId, size, 0);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteWishlistItem = async (productId, size) => {
    try {
      const response = await axios.delete(
        `${backend_url}/api/wishlist/deleteWishlistItem/${productId}`,
        {
          data: { size },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      if (response.status === 200) {
        const updatedWishlist = wishlistItems.filter(
          (item) => item.productId !== productId || item.size !== size
        );
        setWishlistItems(updatedWishlist);
        addCartItem(productId, size);
        // toast.success("Product moved to cart successfully");
      } else {
        toast.error("Failed to move product to cart");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  const updateWishlistItem = async (productId, size) => {
    try {
      const response = await axios.delete(
        `${backend_url}/api/wishlist/deleteWishlistItem/${productId}`,
        {
          data: { size },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      if (response.status === 200) {
        const updatedWishlist = wishlistItems.filter(
          (item) => item.productId !== productId || item.size !== size
        );
        setWishlistItems(updatedWishlist);
        toast.success("Product removed from wislist successfully.");
      } else {
        toast.error("Failed to delete item from wishlist");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  const handleLogout = () => {
    try {
      navigate("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      setToken("");
      setCartItem({});
    } catch (error) {
      console.error(error);
    }
  };
  const getUserData = async () => {
    try {
      const res = await axios.get(`${backend_url}/api/user/getUserData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        // console.log(res.data.response);
        setUserData(res.data.response);
      } else {
        toast.error("Something Went wrong try again later.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getOrders = async () => {
    try {
      const orders = await axios.post(
        `${backend_url}/api/order/userOrder`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (orders.status === 200) {
        let allOrdersItem = [];
        orders &&
          orders.data.orders.map((order) => {
            order.items.map((item) => {
              item["status"] = order.status;
              item["payment"] = order.payment;
              item["paymentMethod"] = order.paymentMethod;
              item["date"] = order.date;
              item["amount"] = order.amount;
              item["quantity"] = item.quantity || 1;
              allOrdersItem.push(item);
            });
          });
        // console.log(orders);
        setAllOrders(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const fetchWishlist = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/api/wishlist/getUserWishlist`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const wishlist = response.data.wishlist;
        setItems(wishlist);
      } else {
        toast.error("Failed to fetch wishlist");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error fetching the wishlist");
    }
  };
  useEffect(() => {
    updateCartNumber();
  }, [cartItem]);

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token")); // Make sure you also fetch the cart data if needed
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addCartItem,
    cartCount,
    updateQuantity,
    findTotalPrice,
    navigate,
    backend_url,
    token,
    setToken,
    setCartItem,
    addToWishlist,
    getUserCart,
    wishlistItems,
    deleteWishlistItem,
    updateWishlistItem,
    userData,
    getUserData,
    handleLogout,
    getOrders,
    allOrders,
    fetchWishlist,
    items,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;

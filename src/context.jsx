import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [isHomeLoading, setIsHomeLoading] = useState({
    isCategoriesLoading: false,
    pageLoading: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [products, setProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(null);
  const [whishList, setWishList] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isPassChanged, setIsPassChanged] = useState(false);
  const [cartLength, setCartLength] = useState(null);
  const [wishListLength, setWishListLength] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  // ! get all products
  const getProducts = async () => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        "https://route-ecommerce-app.vercel.app/api/v1/products"
      );

      setProducts(data?.data);
      setIsLoading(false);
      console.log(data?.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // ! api header
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  let tokenDecode = null;
  if (localStorage.getItem("userToken")) {
    tokenDecode = jwtDecode(localStorage.getItem("userToken"));
  }
  // ! forget password
  const forgetPassword = (email) => {
    event.preventDefault();
    setIsLoading(true);

    return axios
      .post(
        `https://route-ecommerce-app.vercel.app/api/v1/auth/forgotPasswords`,
        { email }
      )
      .then((res) => {
        console.log(res);
        if (res.data.statusMsg == "success") {
          setIsCodeSent(true);
        }
        setIsLoading(false);

        return res;
      })
      .catch((err) => {
        setIsLoading(false);
        return err;
      });
  };

  // ! verify code
  const verifyCode = (resetCode) => {
    event.preventDefault();
    setIsLoading(true);
    return axios
      .post(
        `https://route-ecommerce-app.vercel.app/api/v1/auth/verifyResetCode`,
        { resetCode }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          setIsCodeCorrect(true);
        }
        setIsLoading(false);
        return res;
      })
      .catch((err) => {
        setIsLoading(false);
        return err;
      });
  };
  // ! reset password
  const resetPassword = (email, newPassword) => {
    event.preventDefault();
    setIsLoading(true);

    return axios
      .put(`https://route-ecommerce-app.vercel.app/api/v1/auth/resetPassword`, {
        email,
        newPassword,
      })
      .then((res) => {
        if (res.data.token) {
          setIsPassChanged(true);
        }
        setIsLoading(false);
        return res;
      })
      .catch((err) => {
        setIsLoading(false);
        return err;
      });
  };

  // ! add to cart
  const addToCart = (productId) => {
    return axios
      .post(
        `https://route-ecommerce-app.vercel.app/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((res) => {
        const customId = "custom-id-yes";

        setCartLength(res.data.numOfCartItems);
        toast.success(res.data.message, { autoClose: 1000, toastId: customId });
        return res;
      })
      .catch((err) => {
        const customId = "custom-id-yes";
        toast.error("you have to signin", {
          autoClose: 1000,
          toastId: customId,
        });

        return err;
      });
  };

  // ! get user cart
  const getUserCart = async () => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://route-ecommerce-app.vercel.app/api/v1/cart`,
        { headers }
      );
      setIsLoading(false);
      setCart(data.data);
      setCartLength(data.numOfCartItems);
      setCartId(data.data._id);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // ! update cart
  const updateCart = async (count, id) => {
    try {
      let { data } = await axios.put(
        `https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`,
        { count },
        { headers }
      );
      setCart(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ! remove product in cart
  const removeCartProduct = async (id) => {
    try {
      let { data } = await axios.delete(
        `https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`,
        { headers }
      );
      setCartLength(data.numOfCartItems);
      setCart(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ! add to which list
  const addWhishList = (productId) => {
    return axios
      .post(
        `https://route-ecommerce-app.vercel.app/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then((res) => {
        console.log(res);
        const customId = "custom-id-yes";
        toast.success(res.data.message, { autoClose: 1000, toastId: customId });
        setWishListLength(res.data.data.length);
        getUserWhishList();

        return res;
      })
      .catch((err) => {
        const customId = "custom-id-yes";
        toast.error("you have to signin", {
          autoClose: 1000,
          toastId: customId,
        });
        return err;
      });
  };

  // ! remove whish list
  const removeWhishList = (productId) => {
    return axios
      .delete(
        `https://route-ecommerce-app.vercel.app/api/v1/wishlist/${productId}`,
        { headers }
      )
      .then((res) => {
        console.log(res);
        const customId = "custom-id-yes";
        toast.success(res.data.message, { autoClose: 1000, toastId: customId });
        setWishListLength(res.data.data.length);
        getUserWhishList();
        return res;
      })
      .catch((err) => err);
  };

  // ! get user which list
  const getUserWhishList = async () => {
    try {
      let { data } = await axios.get(
        `https://route-ecommerce-app.vercel.app/api/v1/wishlist`,
        { headers }
      );
      setWishList(data?.data);
      setWishListLength(data.count);
      console.log(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ! online payment
  const onlinePayment = async (id, ShippingAddress) => {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        `https://route-ecommerce-app.vercel.app/api/v1/orders/checkout-session/${id}?url=https://creator-ecommerce.netlify.app`,
        { ShippingAddress },
        { headers }
      );
      setIsLoading(false);
      console.log(data);
      window.location.href = data.session.url;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // ! get user orders
  const getUserOrders = async (id) => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://route-ecommerce-app.vercel.app/api/v1/orders/user/${id}`
      );
      setIsLoading(false);
      setUserOrders(data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // ! useEffect Function
  useEffect(() => {
    localStorage.getItem("userToken")
      ? setUserToken(localStorage.getItem("userToken"))
      : null;
    getUserWhishList();
    getProducts();
    getUserCart();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userToken,
        setUserToken,
        products,
        isLoading,
        setIsLoading,
        getProducts,
        setQuantity,
        quantity,
        addToCart,
        getUserCart,
        cart,
        addWhishList,
        getUserWhishList,
        whishList,
        forgetPassword,
        isCodeSent,
        verifyCode,
        setUserEmail,
        userEmail,
        setIsCodeSent,
        setIsCodeCorrect,
        isCodeCorrect,
        resetPassword,
        setIsPassChanged,
        isPassChanged,
        isHomeLoading,
        cartLength,
        updateCart,
        removeCartProduct,
        cartId,
        onlinePayment,
        tokenDecode,
        getUserOrders,
        userOrders,
        wishListLength,
        removeWhishList,
        getUserWhishList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

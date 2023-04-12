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
  const [categories, setCategories] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(null);
  const [whishList, setWishList] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isPassChanged, setIsPassChanged] = useState(false);
  const [cartLength, setCartLength] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  // ! get all products
  const getProducts = async () => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        "https://route-ecommerce-app.vercel.app/api/v1/products"
      );

      setProducts(data.data);
      getCategories(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // ! get all categories
  const getCategories = (prds) => {
    setIsHomeLoading({ ...isHomeLoading, isCategoriesLoading: true });
    const categriesFilter = prds?.map((prd) => {
      return { name: prd.category.name, image: prd.category.image };
    });
    setIsHomeLoading({ ...isHomeLoading, isCategoriesLoading: false });
  };

  // ! api header
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const tokenDecode = jwtDecode(localStorage.getItem("userToken"));
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
        setCartLength(res.data.numOfCartItems);
        toast.success(res.data.message, { autoClose: 1000 });
        return res;
      })
      .catch((err) => err);
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
      setCart(data.data.products);
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
      setCart(data.data.products);
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
      setCart(data.data.products);
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
      .then((res) => res)
      .catch((err) => err);
  };

  // ! get user which list
  const getUserWhishList = async () => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://route-ecommerce-app.vercel.app/api/v1/wishlist`,
        { headers }
      );
      setIsLoading(false);
      setWishList(data.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onlinePayment = async (id, ShippingAddress) => {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        `https://route-ecommerce-app.vercel.app/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`,
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

  const getUserOrders = async (id) => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://route-ecommerce-app.vercel.app/api/v1/orders/user/${id}`
      );
      setIsLoading(false);
      console.log(data);
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
        categories,
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
        getCategories,
        cartLength,
        updateCart,
        removeCartProduct,
        cartId,
        onlinePayment,
        tokenDecode,
        getUserOrders,
        userOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

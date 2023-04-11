import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  // ! get all products
  const getProducts = async () => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/products"
      );
      setProducts(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // ! get all categories
  const getCategories = async () => {
    setIsHomeLoading({ ...isHomeLoading, isCategoriesLoading: true });
    try {
      let { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/categories"
      );
      setCategories(data.data);
      setIsHomeLoading({ ...isHomeLoading, isCategoriesLoading: false });
    } catch (error) {
      setIsHomeLoading({ ...isHomeLoading, isCategoriesLoading: false });
      console.log(error);
    }
  };

  // ! api header
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  // ! add to cart
  const addToCart = (productId) => {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => err);
  };

  // ! get user cart
  const getUserCart = async () => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        { headers }
      );
      setIsLoading(false);
      setCart(data.data.products);
      setCartLength(data.numOfCartItems);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // ! add to which list
  const addWhishList = (productId) => {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/wishlist`,
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
        `https://route-ecommerce.onrender.com/api/v1/wishlist`,
        { headers }
      );
      setIsLoading(false);
      setWishList(data.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // ! forget password
  const forgetPassword = (email) => {
    event.preventDefault();
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,
        { email }
      )
      .then((res) => {
        console.log(res);
        if (res.data.statusMsg == "success") {
          setIsCodeSent(true);
        }
        return res;
      })
      .catch((err) => err);
  };

  // ! verify code
  const verifyCode = (resetCode) => {
    event.preventDefault();
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,
        { resetCode }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          setIsCodeCorrect(true);
        }
        return res;
      })
      .catch((err) => err);
  };

  // ! reset password
  const resetPassword = (email, newPassword) => {
    event.preventDefault();
    return axios
      .put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`, {
        email,
        newPassword,
      })
      .then((res) => {
        if (res.data.token) {
          setIsPassChanged(true);
        }
        console.log(res);
        return res;
      })
      .catch((err) => err);
  };

  // ! useEffect Function
  useEffect(() => {
    localStorage.getItem("userToken")
      ? setUserToken(localStorage.getItem("userToken"))
      : null;
    getProducts();
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

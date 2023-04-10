import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [homeIsLoading, setHomeIsLoading] = useState({
    categorySlider: false,
    products: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(null);
  const [whishList, setWishList] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isPassChanged, setIsPassChanged] = useState(false);
  // ! get all products
  const getProducts = async () => {
    setHomeIsLoading({ ...homeIsLoading, products: true });
    try {
      let { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/products"
      );
      setProducts(data.data);
      setHomeIsLoading({ ...homeIsLoading, products: false });
    } catch (error) {
      setHomeIsLoading({ ...homeIsLoading, products: false });
      console.log(error);
    }
  };

  // ! get all categories
  const getCateogries = async () => {
    setHomeIsLoading({ ...homeIsLoading, categorySlider: true });

    try {
      let { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/categories"
      );
      setCategories(data.data);
      setHomeIsLoading({ ...homeIsLoading, categorySlider: false });
    } catch (error) {
      setHomeIsLoading({ ...homeIsLoading, categorySlider: false });
      console.log(error);
    }
  };

  // ! single product
  const getSingleProduct = async (id) => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/products/${id}`
      );
      setIsLoading(false);
      setSingleProduct(data.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const addToCart = (productId) => {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  };

  const getUserCart = async () => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        { headers }
      );
      setIsLoading(false);
      setCart(data.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

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

  // ! use effect
  useEffect(() => {
    // !user token
    localStorage.getItem("userToken")
      ? setUserToken(localStorage.getItem("userToken"))
      : null;
    // ! get products
    getProducts();
    getCateogries();
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
        homeIsLoading,
        getSingleProduct,
        singleProduct,
        setQuantity,
        quantity,
        addToCart,
        getUserCart,
        cart,
        addWhishList,
        getUserWhishList,
        whishList,
        setUserData,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

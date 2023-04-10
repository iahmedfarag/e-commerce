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
  const [categoryProducts, setCategoryProducts] = useState(null);

  // ! get all products
  const getProducts = async () => {
    setHomeIsLoading({ ...homeIsLoading, products: true });
    try {
      let { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/products"
      );
      setProducts(data.data);
      setHomeIsLoading({ ...homeIsLoading, products: false });
      console.log(data.data);
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
      console.log(data.data);
    } catch (error) {
      setHomeIsLoading({ ...homeIsLoading, categorySlider: false });
      console.log(error);
    }
  };
  // ! get category products
  const getCategoryProducts = async (slug) => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/products"
      );
      let catProductsArr = data.data.filter(
        (prd) => prd.category.slug === slug
      );
      setCategoryProducts(catProductsArr);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
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
        getCategoryProducts,
        categoryProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

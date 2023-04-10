import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Cart,
  Home,
  Layout,
  Products,
  Signin,
  Signup,
  SingleProduct,
  UserProfile,
  NoPage,
  WishList,
  CategoryProducts,
} from "./Pages.js";
import { useGlobalContext } from "./context.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const App = () => {
  const { setUserToken } = useGlobalContext();

  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "signin", element: <Signin /> },
        { path: "signup", element: <Signup /> },
        { path: "cart", element: <Cart /> },
        { path: "profile", element: <UserProfile /> },
        { path: "products", element: <Products /> },
        { path: "WishList", element: <WishList /> },
        { path: "singleProduct/:id", element: <SingleProduct /> },
        { path: "category/:slug", element: <CategoryProducts /> },
        { path: "*", element: <NoPage /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={routers}>
      <Layout />
    </RouterProvider>
  );
};
export default App;

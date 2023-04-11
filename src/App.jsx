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
  ForgetPassword,
  VerifyCode,
  ResetPassword,
} from "./Pages.js";
import { useGlobalContext } from "./context.jsx";

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
        { path: "products/:id", element: <SingleProduct /> },
        { path: "category/:slug", element: <CategoryProducts /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verifycode", element: <VerifyCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "products", element: <Products /> },
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

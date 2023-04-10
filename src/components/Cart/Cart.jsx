import React, { useEffect } from "react";
import { useGlobalContext } from "../../context.jsx";

const Cart = () => {
  const { isLoading, getUserCart, cart } = useGlobalContext();

  useEffect(() => {
    getUserCart();
    console.log(cart);
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }
  return <div>Cart</div>;
};

export default Cart;

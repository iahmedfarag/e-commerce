import React, { useEffect } from "react";
import { useGlobalContext } from "../../context.jsx";

const UserOrders = () => {
  const { getUserOrders, tokenDecode, isLoading } = useGlobalContext();
  useEffect(() => {
    getUserOrders(tokenDecode.id);
  }, []);
  if (isLoading) {
    <div className="loader-container">
      <div className="loader"></div>
    </div>;
  }
  return <div>UserOrders</div>;
};

export default UserOrders;

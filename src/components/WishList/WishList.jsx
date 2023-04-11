import React, { useEffect } from "react";
import { useGlobalContext } from "../../context.jsx";

const WishList = () => {
  const { isLoading, getUserWhishList, whishList } = useGlobalContext();

  useEffect(() => {
    getUserWhishList();
    console.log(whishList);
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }
  return <div>WishList</div>;
};

export default WishList;

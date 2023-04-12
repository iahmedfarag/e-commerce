import React, { useEffect } from "react";
import { useGlobalContext } from "../../context.jsx";
import { AiOutlineClose } from "react-icons/ai";
const Cart = () => {
  const { isLoading, getUserCart, cart, updateCart } = useGlobalContext();
  useEffect(() => {
    getUserCart();
  }, []);
  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <div className="cart">
      <div className="row cart-header">
        <p className="cart-details">Product Details</p>
        <p className="cart-price">Price</p>
        <p className="cart-quantity">Quantity</p>
        <p className="cart-total">Total</p>
        <p className="cart-remove">Remove</p>
      </div>
      {cart?.map((item) => {
        const { count, price, product, _id } = item;
        return (
          <div className="row cart-item">
            <div className="cart-details">
              <img src={product.imageCover} alt="img" className="item-img" />
              <p className="item-name">{product.title}</p>
            </div>
            <p className="cart-price item-price">{price} egp</p>
            <div className="cart-quantity item-quantity">
              <input
                type="number"
                min={1}
                value={count}
                onChange={(e) => {
                  updateCart("9", _id);
                }}
              />
            </div>
            <p className="cart-total item-total">{price * count} egp</p>
            <AiOutlineClose className="cart-remove item-remove" />
          </div>
        );
      })}
    </div>
  );
};

export default Cart;

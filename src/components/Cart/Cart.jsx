import React, { useEffect } from "react";
import { useGlobalContext } from "../../context.jsx";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cart = () => {
  const { isLoading, getUserCart, cart, updateCart, removeCartProduct } =
    useGlobalContext();
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
  console.log(cart);
  return (
    <>
      <div className="cart">
        <div className="items">
          <div className="row cart-header">
            <p className="cart-details">Product</p>
            <p className="cart-price">Price</p>
            <p className="cart-quantity">Quantity</p>
            <p className="cart-total">Total</p>
            <p className="cart-remove">Remove</p>
          </div>
          {cart ? (
            cart.length < 1 ? (
              <h3>no products</h3>
            ) : (
              cart.map((item) => {
                const { count, price, product } = item;
                return (
                  <div className="row cart-item">
                    <div className="cart-details">
                      <img
                        src={product.imageCover}
                        alt="img"
                        className="item-img"
                      />
                      <p className="item-name">{product.title}</p>
                    </div>
                    <p className="cart-price item-price">{price} egp</p>
                    <div className="cart-quantity item-quantity">
                      <input
                        type="number"
                        min={1}
                        value={count}
                        onChange={(e) => {
                          updateCart(e.target.value, product._id);
                        }}
                      />
                    </div>
                    <p className="cart-total item-total">{price * count} egp</p>
                    <AiOutlineClose
                      className="cart-remove item-remove"
                      onClick={() => {
                        removeCartProduct(product._id);
                      }}
                    />
                  </div>
                );
              })
            )
          ) : (
            <h3>no products</h3>
          )}
        </div>
        <div className="checkout">
          <h3>Cart Total</h3>
          <div className="checkout-wrapper">
            <div className="subtotal line">
              <p>Subtotal: </p>
              <span>900 egp</span>
            </div>
            <div className="shipping line">
              <p>Shipping: </p>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                dolor nihil accusamus ipsam voluptatibus libero architecto?
              </span>
            </div>
            <div className="total line">
              <p>Total: </p>
              <p>900 egp</p>
            </div>

            <Link className="checkout-btn" to="/shippingaddress">
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

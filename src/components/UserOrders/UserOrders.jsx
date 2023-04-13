import React, { useEffect } from "react";
import { useGlobalContext } from "../../context.jsx";

const UserOrders = () => {
  const { getUserOrders, tokenDecode, isLoading, userOrders } =
    useGlobalContext();
  useEffect(() => {
    getUserOrders(tokenDecode.id);
  }, []);
  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }
  console.log(userOrders);
  return (
    <section className="orders">
      <h3>All Orders</h3>

      {userOrders?.map((order) => {
        const {
          cartItems,
          isDeliverd,
          paymentMethodType,
          totalOrderPrice,
          createdAt,
          paidAt,
        } = order;
        return (
          <article className="order">
            <div className="single-order">
              <h4 className="order-number">Order {createdAt}</h4>
              {cartItems?.map((item) => {
                const { count, price, product } = item;
                const titleArr = product.title.split(" ");
                let newTitle = "";
                if (titleArr.length > 4) {
                  newTitle = titleArr.slice(0, 3).join(" ");
                } else {
                  newTitle = product.title;
                }
                return (
                  <>
                    <div className="order-items">
                      <img src={product.imageCover} className="item-img" />|
                      <p className="item-title">{newTitle}</p>|
                      <p className="item-price">{price} egp</p>|
                      <p className="item-count">
                        {count} item{count > 1 ? "s" : ""}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="order-total">
              <p className="total-price">
                Total: <span>{totalOrderPrice} egp</span>
              </p>
              <p className="order-deliverd">
                is Order Deliver:
                <span>{isDeliverd ? " Yes" : " No"}</span>
              </p>
              <p className="order-paid-at">
                Payment At: <span>{paidAt}</span>
              </p>
              <p className="order-payment-method">
                Payment Method: <span>{paymentMethodType}</span>
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default UserOrders;

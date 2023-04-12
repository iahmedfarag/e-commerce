import React from "react";
import { useGlobalContext } from "../../context.jsx";
import { useFormik } from "formik";

const ShippingAddress = () => {
  const { cartId, onlinePayment } = useGlobalContext();

  const handleSumbit = (values) => {
    onlinePayment(cartId, values);
  };

  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: handleSumbit,
  });
  return (
    <section className="form">
      <h3>Checkout</h3>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Details"
          id="email"
          name="email"
          value={formik.details}
          onChange={formik.handleChange}
        />
        <input
          type="tel"
          placeholder="Phone"
          id="phone"
          name="phone"
          value={formik.phone}
          onChange={formik.handleChange}
        />
        <input
          type="text"
          placeholder="City"
          id="city"
          name="city"
          value={formik.city}
          onChange={formik.handleChange}
        />
        <button type="sumbit">Pay</button>
      </form>
    </section>
  );
};

export default ShippingAddress;

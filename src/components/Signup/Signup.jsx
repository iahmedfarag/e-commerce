import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigtae = useNavigate();
  const HandleSignup = async (values) => {
    setIsLoading(true);

    try {
      let { data } = await axios.post(
        "https://route-ecommerce.onrender.com/api/v1/auth/signup",
        values
      );
      setIsLoading(false);

      navigtae("/signin");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "01069858429",
    },
    onSubmit: HandleSignup,
  });

  return (
    <section className="form register-form">
      <h3>Sign up</h3>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <input
          type="password"
          placeholder="RePassword"
          name="rePassword"
          id="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
        />

        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <button type="sumbit">Sign up</button>
        )}
      </form>
    </section>
  );
};

export default Signup;

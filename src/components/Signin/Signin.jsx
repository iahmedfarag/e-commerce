import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context.jsx";

const Signin = () => {
  const navigate = useNavigate();
  const { setUserToken, setIsLoading, isLoading } = useGlobalContext();

  const HandleSignin = async (values) => {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://route-ecommerce.onrender.com/api/v1/auth/signin",
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserToken(localStorage.getItem("userToken", data.token));
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: HandleSignin,
  });

  return (
    <section className="form">
      <h3>Signin</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Link to="/forgetpassword" className="forget-password-link">
          forget password...?
        </Link>

        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <button type="sumbit">Signin</button>
        )}
      </form>
    </section>
  );
};

export default Signin;

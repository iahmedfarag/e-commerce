import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context.jsx";

const Signin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken } = useGlobalContext();
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: HandleSignin,
  });

  return (
    <section className="form register-form">
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

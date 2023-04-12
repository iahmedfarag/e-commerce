import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context.jsx";
import * as Yup from "yup";

const Signin = () => {
  const navigate = useNavigate();
  const { setUserToken, setIsLoading, isLoading } = useGlobalContext();
  const [errorMsg, setErrorMsg] = useState("");

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
      setErrorMsg(error.response.data.message);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must starts with uppecase"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: HandleSignin,
  });

  return (
    <section className="form">
      <h3>Signin</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email ? (
          <span className="alert-error">{formik.errors.email}</span>
        ) : (
          ""
        )}
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password ? (
          <span className="alert-error">{formik.errors.password}</span>
        ) : (
          ""
        )}
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

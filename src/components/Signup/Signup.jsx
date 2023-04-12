import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

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

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "minLength is 3")
      .max(10, "maxLength is 10"),
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password mush starts with uppercase"),
    rePassword: Yup.string()
      .required("repassword is required")
      .oneOf([Yup.ref("password")], "password and repassword doesn't matched"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "01069858429",
    },
    validationSchema,
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
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? (
          <span className="alert-error">{formik.errors.name}</span>
        ) : (
          ""
        )}
        <input
          type="text"
          placeholder="Email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <span className="alert-error">{formik.errors.email}</span>
        ) : (
          ""
        )}
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <span className="alert-error">{formik.errors.password}</span>
        ) : (
          ""
        )}
        <input
          type="password"
          placeholder="RePassword"
          name="rePassword"
          id="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <span className="alert-error">{formik.errors.rePassword}</span>
        ) : (
          ""
        )}
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

import React, { useState } from "react";
import { useGlobalContext } from "../../context.jsx";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const {
    isLoading,
    forgetPassword,
    isCodeSent,
    setIsCodeSent,
    userEmail,
    setUserEmail,
  } = useGlobalContext();
  const navigate = useNavigate();
  if (isCodeSent) {
    navigate("/verifycode");
    setIsCodeSent(false);
  }
  return (
    <section className="form">
      <h3>Forget Password</h3>
      <form
        action=""
        onSubmit={() => {
          forgetPassword(userEmail);
        }}
      >
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />

        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <button type="sumbit">Send Reset Code</button>
        )}
      </form>
    </section>
  );
};

export default ForgetPassword;

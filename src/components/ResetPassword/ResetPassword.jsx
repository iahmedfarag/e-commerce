import React, { useState } from "react";
import { useGlobalContext } from "../../context.jsx";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { isLoading, resetPassword, isPassChanged, setIsPassChanged } =
    useGlobalContext();
  const [userEmail, setUserEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  if (isPassChanged) {
    navigate("/signin");
    setIsPassChanged(false);
  }
  return (
    <section className="form">
      <h3>Reset Password</h3>
      <form
        action=""
        onSubmit={() => {
          resetPassword(userEmail, newPass);
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
        <input
          type="password"
          placeholder="New Password"
          name="password"
          id="password"
          value={newPass}
          onChange={(e) => {
            setNewPass(e.target.value);
          }}
        />

        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <button type="sumbit">Reset Password</button>
        )}
      </form>
    </section>
  );
};

export default ResetPassword;

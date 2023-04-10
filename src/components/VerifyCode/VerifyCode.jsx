import React, { useState } from "react";
import { useGlobalContext } from "../../context.jsx";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const navigate = useNavigate();
  const {
    isLoading,

    isCodeCorrect,
    setIsCodeCorrect,
    verifyCode,
  } = useGlobalContext();
  const [resetCode, setResetCode] = useState("");

  if (isCodeCorrect) {
    navigate("/resetpassword");
    setIsCodeCorrect(false);
  }
  return (
    <section className="form">
      <h3>Verify Code</h3>
      <form
        action=""
        onSubmit={() => {
          verifyCode(resetCode);
        }}
      >
        <input
          type="text"
          placeholder="Reset Code"
          id="reset"
          name="reset"
          value={resetCode}
          onChange={(e) => {
            setResetCode(e.target.value);
          }}
        />

        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <button type="sumbit">Verify Code</button>
        )}
      </form>
    </section>
  );
};

export default VerifyCode;

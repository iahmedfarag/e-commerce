import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  if (localStorage.getItem("userToken") === null) {
    return navigate("/signin");
  } else {
    return props.children;
  }
};

export default ProtectedRoute;

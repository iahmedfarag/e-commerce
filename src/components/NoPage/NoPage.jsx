import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="nopage">
      <h3>no page found</h3>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default NoPage;

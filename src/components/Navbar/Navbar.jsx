import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context.jsx";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
const Navbar = () => {
  const navigate = useNavigate();
  const { userToken, setUserToken } = useGlobalContext();

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="container">
        <Link to="/" className="nav-logo">
          E-COMMERCE
        </Link>
        <input type="text" className="nav-search" placeholder="Search" />
        <div className="nav-btns">
          {userToken ? (
            <>
              <Link to="/wishlist" className="nav-btn">
                <AiOutlineHeart />
              </Link>
              <Link to="/cart" className="nav-btn">
                <AiOutlineShoppingCart />
              </Link>
              <Link to="/profile" className="nav-btn">
                <AiOutlineUser />
              </Link>
              <Link className="nav-btn" onClick={logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-btn">
                Signin
              </Link>
              <Link to="/signup" className="nav-btn">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

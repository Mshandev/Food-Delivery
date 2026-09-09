import { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { setReturnTo } from "../../utils/returnTo";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  const handleSignIn = () => {
    setReturnTo(
      window.location.pathname + window.location.search + window.location.hash
    );
    navigate("/login");
  };

  const handleSignUp = () => {
    setReturnTo(
      window.location.pathname + window.location.search + window.location.hash
    );
    navigate("/register");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <div className="navbar-guest-ctas">
            <button
              data-testid="navbar-signin"
              onClick={handleSignIn}
            >
              Sign in
            </button>
            <button
              data-testid="navbar-signup"
              onClick={handleSignUp}
              className="btn-signup"
            >
              Sign up
            </button>
          </div>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li
                data-testid="navbar-orders"
                onClick={() => navigate("/myorders")}
              >
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li data-testid="navbar-account" className="dropdown-placeholder">
                <img src={assets.profile_icon} alt="" />
                <p>Account</p>
              </li>
              <hr />
              <li data-testid="navbar-saved-addresses" className="dropdown-placeholder">
                <img src={assets.bag_icon} alt="" />
                <p>Saved Addresses</p>
              </li>
              <hr />
              <li data-testid="navbar-signout" onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Sign out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

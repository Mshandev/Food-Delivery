import { useContext, useState } from "react";
import "./Login.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { getReturnTo, clearReturnTo } from "../../utils/returnTo";

const Login = () => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + "/api/user/login", data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login Successfully");
        const returnTo = getReturnTo();
        clearReturnTo();
        navigate(returnTo);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-page" data-testid="login-page">
      <form onSubmit={onSubmit} className="auth-container">
        <div className="auth-title">
          <h2>Sign In</h2>
        </div>
        <div className="auth-inputs">
          <input
            data-testid="login-email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            data-testid="login-password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        <button data-testid="login-submit" type="submit">
          Sign In
        </button>
        <div className="auth-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use &amp; privacy policy.</p>
        </div>
        <p>
          Don&apos;t have an account?{" "}
          <Link to="/register" data-testid="login-to-register">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

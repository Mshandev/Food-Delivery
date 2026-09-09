import { useContext, useState } from "react";
import "./Register.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { getReturnTo, clearReturnTo } from "../../utils/returnTo";

const Register = () => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + "/api/user/register", data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Registration Successful");
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
    <div className="auth-page" data-testid="register-page">
      <form onSubmit={onSubmit} className="auth-container">
        <div className="auth-title">
          <h2>Create Account</h2>
        </div>
        <div className="auth-inputs">
          <input
            data-testid="register-name"
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Your name"
            required
          />
          <input
            data-testid="register-email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            data-testid="register-password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        <button data-testid="register-submit" type="submit">
          Create Account
        </button>
        <div className="auth-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use &amp; privacy policy.</p>
        </div>
        <p>
          Already have an account?{" "}
          <Link to="/login" data-testid="register-to-login">
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

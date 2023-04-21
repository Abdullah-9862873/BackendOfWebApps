import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/LoginStyles.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      console.log(data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <section>
        <form onSubmit={SubmitHandler}>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
          <button disabled={loading} type="submit" className="login-btn">
            Login
          </button>
          <div className="or-container">
            <div className="or-line"></div>
            <div className="or-text">Or</div>
            <div className="or-line"></div>
          </div>
          <Link to="/register">Sign up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;

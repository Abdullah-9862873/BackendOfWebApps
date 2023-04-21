import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {Context} from "../index";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {data} = await axios.post(
        `http://localhost:4000/api/v1/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers:{
            "Content-Type": "application/json",
          },
          withCredentials: true
        },
      );
  
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if(isAuthenticated){
    return <Navigate to={"/"} />
  }

  return (
    <div>
      <section>
        <h1>Registration</h1>
        <form onSubmit={SubmitHandler}>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            id="name"
            name="name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            id="email"
            name="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            required
          />

          <button
            disabled={loading}
            type="submit"
            className="bg-[#005c99] hover:bg-[#003d66] text-white"
          >
            Register
          </button>
        </form>
        <div className="or-container">
          <div className="or-line"></div>
          <div className="or-text">or</div>
          <div className="or-line"></div>
        </div>
        <Link to="/login">Already have an account? Login</Link>
      </section>
    </div>
  );
};

export default Register;

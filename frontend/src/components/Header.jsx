import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../index';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../styles/HeaderStyles.css';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`http://localhost:4000/api/v1/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div className="left">
        <h2>Todo App.</h2>
      </div>
      <div className="right">
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={()=>{
            logoutHandler();
          }} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;

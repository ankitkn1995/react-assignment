/** @format */
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";
import ToastContainerCommon from "../ToastContainerCommon";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersData = useSelector((state) => state);
  const loginUser = JSON.parse(localStorage.getItem("login"));
  const handleLogout = () => {
    dispatch(
      logout({
        type: "logout",
      })
    );
    toast.success("Logout successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/");
  };
  console.log(usersData);
  return (
    <>
      <div className='header'>
        <h1 className='redux__heading'>
          <Link to='/'>Redux System</Link>
        </h1>
        <div className='nav__link'>
          <div className='nav__item'>
            <div>
              <Link to='/'>Home</Link>
            </div>
            <div>
              <Link to='/addUser'>Add User</Link>
            </div>
          </div>
          <div>
            <div className='auth__link'>
              {loginUser?.loggedIn === true ? (
                <Link to='#' onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <>
                  <Link to='login'>Login</Link>
                  <Link to='register'>Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainerCommon />
    </>
  );
};

export default Header;

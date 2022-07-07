/** @format */
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ToastContainerCommon from "../ToastContainerCommon";

const Login = () => {
  const [loginFormVal, setLoginFormVal] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginFormVal({ ...loginFormVal, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = JSON.parse(localStorage.getItem("register"));
  console.log(users);
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload =
      users &&
      users.find(
        (user) =>
          user.email === loginFormVal.email &&
          user.password === loginFormVal.password
      );
    if (payload) {
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(
        login({
          email: loginFormVal.email,
          password: loginFormVal.password,
          loggedIn: true,
        })
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);
      setLoginFormVal({
        email: "",
        password: "",
      });
    } else {
      alert("wrong credential or please register with us");
      setLoginFormVal({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className='forms'>
      <form onSubmit={(e) => handleSubmit(e)} className='design__form'>
        <div className='heading'>Login</div>
        <div className='input'>
          <label>Email</label>
          <input
            type={"text"}
            name='email'
            value={loginFormVal.email}
            onChange={handleChange}
          />
        </div>
        <div className='input'>
          <label>Password</label>
          <input
            type={"text"}
            name='password'
            value={loginFormVal.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
      <ToastContainerCommon />
    </div>
  );
};

export default Login;

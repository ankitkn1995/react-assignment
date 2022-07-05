/** @format */
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { register } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ToastContainerCommon from "../ToastContainerCommon";
const Register = () => {
  const [formVal, setFormVal] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [touch, setTouch] = useState(false);
  //   const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (touch === true) {
      setError(checkValidation(formVal));
    }
  }, [formVal]);
  const checkValidation = (val) => {
    let errors = {};
    if (val.name === "") {
      errors.name = "Enter your name";
    }
    if (val.email === "") {
      errors.email = "Enter your email";
    }
    if (val.password === "") {
      errors.password = "Enter your password";
    }
    return errors;
  };
  const handleSubmit = (e) => {
    setTouch(true);
    e.preventDefault();
    const checkValid = checkValidation(formVal);
    if (Object.keys(checkValid).length === 0) {
      dispatch(
        register({
          name: formVal.name,
          email: formVal.email,
          password: formVal.password,
        })
      );
      toast.success("Successfully Register", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //   setMessage("Thanks for registering with us.Go To login");
      setFormVal({
        name: "",
        email: "",
        password: "",
      });
      setTouch(false);
    } else {
      setError(checkValid);
      //   setMessage("");
    }
  };
  console.log(error);
  return (
    <>
      <div className='forms'>
        <form onSubmit={handleSubmit} className='design__form'>
          <div className='heading'>Register</div>
          {/* <div className='success'>{message === "" ? "" : message}</div> */}
          <div className='input'>
            <label>Name</label>
            <input
              type={"text"}
              name='name'
              value={formVal.name}
              onChange={handleChange}
            />
            <div className='war__message'>{error && error.name}</div>
          </div>

          <div className='input'>
            <label>Email</label>
            <input
              type={"text"}
              name='email'
              value={formVal.email}
              onChange={handleChange}
            />
            <div className='war__message'>{error && error.email}</div>
          </div>

          <div className='input'>
            <label>Password</label>
            <input
              type={"text"}
              name='password'
              value={formVal.password}
              onChange={handleChange}
            />
            <div className='war__message'>{error && error.password}</div>
          </div>
          <div>
            <button type='submit'>Register</button>
          </div>
        </form>
        <ToastContainerCommon />
      </div>
    </>
  );
};

export default Register;

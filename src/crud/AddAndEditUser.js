/** @format */
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ToastContainerCommon from "../ToastContainerCommon";
import { createUser } from "./crudSlice";
const AddAndEditUser = () => {
  const [formVal, setFormVal] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, mobile } = formVal;
    if (name && email && mobile) {
      dispatch(createUser({ formVal }));
      toast.success("User added", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFormVal({
        name: "",
        email: "",
        mobile: "",
      });

      navigate("/");
    } else {
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='design__form'>
        <div className='heading'>Add New User</div>
        {/* <div className='success'>{message === "" ? "" : message}</div> */}
        <div className='input'>
          <label>Name</label>
          <input
            type={"text"}
            name='name'
            value={formVal.name}
            onChange={handleChange}
          />
        </div>

        <div className='input'>
          <label>Email</label>
          <input
            type={"text"}
            name='email'
            value={formVal.email}
            onChange={handleChange}
          />
        </div>

        <div className='input'>
          <label>Mobile No.</label>
          <input
            type={"text"}
            name='mobile'
            value={formVal.mobile}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type='submit'>Add User</button>
        </div>
      </form>
      <ToastContainerCommon />
    </div>
  );
};

export default AddAndEditUser;

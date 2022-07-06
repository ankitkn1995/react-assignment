/** @format */
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToastContainerCommon from "../ToastContainerCommon";
import { createUser, updateUser } from "./crudSlice";
const AddAndEditUser = () => {
  const [formVal, setFormVal] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const handleChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  };
  const { users } = useSelector((state) => state.crud);
  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.res.find((item) => item.id == id);
      setFormVal({ ...singleUser });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, mobile } = formVal;
    if (name && email && mobile) {
      if (!editMode) {
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
        dispatch(updateUser({ id, formVal }));
        setEditMode(false);
        navigate("/");
        toast.success("User updated successfully", {
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
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='design__form'>
        <div className='heading'>{editMode ? "Edit User" : "Add New User"}</div>
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
          <button type='submit'>{editMode ? "Update User" : "Add User"}</button>
        </div>
      </form>
      <ToastContainerCommon />
    </div>
  );
};

export default AddAndEditUser;

/** @format */
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const ProtectRoute = (props) => {
  const loginUser = JSON.parse(localStorage.getItem("login"));
  console.log(loginUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (loginUser && Object.keys(loginUser).length !== 0) {
      navigate("/");
    }
  }, []);
  return <div>{props.children}</div>;
};

export default ProtectRoute;

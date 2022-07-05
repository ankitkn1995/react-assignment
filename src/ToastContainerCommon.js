/** @format */
import { ToastContainer } from "react-toastify";
import React from "react";

const ToastContainerCommon = () => {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ToastContainer />
    </>
  );
};

export default ToastContainerCommon;

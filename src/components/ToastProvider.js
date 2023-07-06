import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }) => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {children}
    </>
  );
};

export default ToastProvider;

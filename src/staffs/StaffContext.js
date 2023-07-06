import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const StaffContext = createContext();

const URL =
  "https://649aaf0ebf7c145d02394cc8.mockapi.io/api/v1/staffManagement";
const StaffProvider = ({ children }) => {
  const [staffs, setStaffs] = useState([]);

  //for delete staff
  const handleDelete = async (id) => {
    if (
      window.confirm(
        `Are you sure that you want to delete a staff with ID ${id} `
      )
    ) {
      try {
        const res = await axios.delete(`${URL}/${id}`);
        if (res.status === 200) {
          getListStaff();
          toast.success("Deleted Successfully ~");
        } else {
          toast.error("Delete Error!");
        }
      } catch (error) {
        toast.error("Delete Error!");
      }
    }
  };

  //for update staff
  const handleUpdate = async (id, data) => {
    try {
      const res = await axios.put(`${URL}/${id}`, data);
      if (res.status === 200) {
        toast.success(`Updated Staff with ID: ${id} successfully ~`);
        getListStaff();
      }
    } catch (error) {
      toast.error("Update Error!");
    }
  };

  //add new staff
  const addNewStaff = async (data) => {
    const res = await axios.post(`${URL}`, data);
    if (res.status === 200 || res.status === 201) {
      toast.success("New staff has been added successfully!");
      getListStaff();
      <Navigate to="/dashboard" />;
    }
  };

  //format date of staff
  const FormatDate = (staffDate) => {
    const date = new Date(staffDate);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  //get all list of staff from MOCAPI
  const getListStaff = async () => {
    try {
      const response = await fetch(`${URL}`);
      const fetchedData = await response.json();
      setStaffs(fetchedData);
    } catch (error) {
      toast.error("Failed to fetch staffs!");
    }
  };

  useEffect(() => {
    getListStaff();
  }, []);

  return (
    <StaffContext.Provider
      value={{
        staffs,
        handleDelete,
        FormatDate,
        handleUpdate,
        addNewStaff,}}
    >
      {children}
      <ToastContainer />
    </StaffContext.Provider>
  );
};

export default StaffProvider;

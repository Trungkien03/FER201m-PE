import React, { useState, useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { StaffContext } from "../staffs/StaffContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
const initialState = {
  name: "",
  avatar: "",
  age: "",
  address: "",
  createdAt: new Date().toISOString(),
};

export const FormAdd = () => {
  const [newStaffState, setNewStaffState] = useState(initialState);
  const { addNewStaff } = useContext(StaffContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required!")
        .min(2, "Name must be 2 characters or more"),
      age: Yup.number()
        .typeError("Must be a number")
        .required("Age is required!")
        .positive("Age must be a positive number")
        .integer("Age must be an integer"),
      address: Yup.string().required("Address is required!"),
      avatar: Yup.string().required("Avatar is required!"),
    }),
    onSubmit: async (values) => {
      await addNewStaff(values);
      setIsSubmitted(true);
    },
  });

  if (isSubmitted) {
    return <Navigate to="/dashboard" />; // Chuyển đến trang "/dashboard" sau khi thêm thành công
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update formik's values
    formik.handleChange(event);

    // Update newStaffState, bao gồm cả trường createdAt
    setNewStaffState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container
          maxWidth="sm"
          sx={{
            bgcolor: "#cfe8fc",
            height: "80vh",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              noWrap
              component="a"
              href="/"
              sx={{
                margin: "20px",
                fontFamily: "inherit",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ADD NEW STAFF
            </Typography>
          </div>
          <div style={{ width: "full", textAlign: "center" }}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl variant="standard">
                <TextField
                  style={{ width: "500px", marginTop: "10px" }}
                  id="outlined-basic"
                  label="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={handleInputChange}
                  error={formik.touched.name && formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                  variant="outlined"
                />
                <TextField
                  style={{ width: "500px", marginTop: "10px" }}
                  id="outlined-basic"
                  label="Age"
                  name="age"
                  value={formik.values.age}
                  onChange={handleInputChange}
                  error={formik.touched.age && formik.errors.age}
                  helperText={formik.touched.age && formik.errors.age}
                  variant="outlined"
                />

                <TextField
                  style={{ width: "500px", marginTop: "10px" }}
                  id="outlined-basic"
                  label="Address"
                  name="address"
                  value={formik.values.address}
                  onChange={handleInputChange}
                  error={formik.touched.address && formik.errors.address}
                  helperText={formik.touched.address && formik.errors.address}
                  variant="outlined"
                />

                <TextField
                  style={{ width: "500px", marginTop: "10px" }}
                  id="outlined-basic"
                  label="Avatar"
                  name="avatar"
                  value={formik.values.avatar}
                  onChange={handleInputChange}
                  error={formik.touched.avatar && formik.errors.avatar}
                  helperText={formik.touched.avatar && formik.errors.avatar}
                  variant="outlined"
                />

                <div style={{ marginTop: "20px" }}>
                  <Button type="submit" variant="contained">
                    Add New
                  </Button>
                </div>
              </FormControl>
            </form>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};

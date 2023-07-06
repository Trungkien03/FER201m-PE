import React, { useContext, useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { StaffContext } from "../staffs/StaffContext";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

// for validate form
import { useFormik } from "formik";
import * as Yup from "yup";

const initialState = {
  name: "",
  avatar: "",
  age: "",
  address: "",
  createdAt: new Date().toISOString(),
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function TransitionsModal({ staffId, handleClose }) {
  const [singleStaff, setSingleStaff] = useState({});
  const open = Boolean(staffId);
  const { staffs, FormatDate, handleUpdate } = useContext(StaffContext);
  const [staffCreatedDate, setStaffCreatedDate] = useState("");
  useEffect(() => {
    const findStaffById = (id) => {
      return staffs.find((staff) => staff.id === id);
    };

    if (staffId) {
      const foundStaff = findStaffById(staffId);
      setSingleStaff(foundStaff);
      const foundStaffDateFormat = FormatDate(foundStaff.createdAt);
      setStaffCreatedDate(foundStaffDateFormat);
    }
  }, [staffId, staffs, FormatDate]);

  const formik = useFormik({
    initialValues: singleStaff,
    enableReinitialize: true, // Thêm thuộc tính enableReinitialize để cập nhật lại giá trị khi initialValues thay đổi
    onSubmit: async (values) => {
      await handleUpdate(staffId, values); // Sử dụng giá trị values từ formik thay vì singleStaff
      handleClose(); // Đóng modal sau khi hoàn thành cập nhật
    },
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
      avatar: Yup.string().required("Required!"),
    }),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update formik's values
    formik.handleChange(event);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h3" id="modal-title">
              Staff Details
            </Typography>
            <form
              style={{ textAlign: "center" }}
              onSubmit={formik.handleSubmit}
            >
              <div>
                <img
                  src={formik.values.avatar}
                  alt="Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "30px",
                  }}
                />
              </div>
              <TextField
                style={{ width: "500px", marginTop: "20px" }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                value={formik.values.name || ""}
                onChange={handleInputChange}
                error={formik.touched.name && formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                style={{ width: "500px", marginTop: "20px" }}
                id="outlined-basic"
                label="Age"
                variant="outlined"
                name="age"
                value={formik.values.age || ""}
                onChange={handleInputChange}
                error={formik.touched.age && formik.errors.age}
                helperText={formik.touched.age && formik.errors.age}
              />
              <TextField
                style={{ width: "500px", marginTop: "20px" }}
                id="outlined-basic"
                label="Address"
                variant="outlined"
                name="address"
                value={formik.values.address || ""}
                onChange={handleInputChange}
                error={formik.touched.address && formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
              />
              <TextField
                style={{ width: "500px", marginTop: "20px" }}
                id="outlined-basic"
                label="Avatar"
                variant="outlined"
                name="avatar"
                value={formik.values.avatar || ""}
                onChange={handleInputChange}
                error={formik.touched.avatar && formik.errors.avatar}
                helperText={formik.touched.avatar && formik.errors.avatar}
              />
              <TextField
                style={{ width: "500px", marginTop: "20px" }}
                id="outlined-basic"
                label="Created At"
                variant="outlined"
                name="createdAt"
                value={FormatDate(formik.values.createdAt) || ""}
                onChange={handleInputChange}
                error={formik.touched.createdAt && formik.errors.createdAt}
                helperText={formik.touched.createdAt && formik.errors.createdAt}
              />
              <Container
                maxWidth="lg"
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </Container>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

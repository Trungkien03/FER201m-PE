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
  const { staffs, FormatDate } = useContext(StaffContext);
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

  const handleFieldChange = (field, value) => {
    setSingleStaff((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box component="form" sx={style}>
            <Typography variant="h3" id="modal-title">
              Staff Details
            </Typography>
            <div>
              <img
                src={singleStaff.avatar}
                alt="Avatar"
                style={{ width: "100px", height: "100px", borderRadius: "30px" }}
              />
            </div>
            <TextField
              style={{ width: "500px", marginTop: "20px" }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={singleStaff.name || ""}
              onChange={(e) => handleFieldChange("name", e.target.value)}
            />
            <TextField
              style={{ width: "500px", marginTop: "20px" }}
              id="outlined-basic"
              label="Age"
              variant="outlined"
              value={singleStaff.age || ""}
              onChange={(e) => handleFieldChange("age", e.target.value)}
            />
            <TextField
              style={{ width: "500px", marginTop: "20px" }}
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={singleStaff.address || ""}
              onChange={(e) => handleFieldChange("address", e.target.value)}
            />

            <TextField
              style={{ width: "500px", marginTop: "20px" }}
              id="outlined-read-only-input"
              label="Created At"
              variant="outlined"
              value={staffCreatedDate || ""}
              InputProps={{
                readOnly: true,
              }}
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
              <Button variant="contained">Update</Button>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

import React, { useContext, useState } from "react";
// MUI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

// Staff context
import { StaffContext } from "../staffs/StaffContext";

// toastify
import { ToastContainer } from "react-toastify";
import { Delete } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import TransitionsModal from "../components/TransitionsModal";

// columns for properties of staff
const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  {
    id: "avatar",
    label: "Avatar",
    minWidth: 170,
  },
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "age",
    label: "Age",
    minWidth: 170,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 170,
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 170,
  },
];

export const Dashboard = () => {
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  // get function from staffContext
  const { staffs, handleDelete } = useContext(StaffContext);
  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <TransitionsModal
        staffId={selectedStaffId}
        handleClose={() => setSelectedStaffId(null)}
      />
      <ToastContainer />
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="primary"
          gutterBottom
          marginTop={2}
          fontWeight="bold"
        >
          DashBoard
        </Typography>
      </Container>
      <Container
        maxWidth="lg"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button variant="contained">Add new staff</Button>
      </Container>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {staffs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((staff) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={staff.id}>
                      {columns.map((column) => {
                        const value = staff[column.id];
                        if (column.id === "Action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ marginRight: "8px" }}
                                onClick={() => setSelectedStaffId(staff.id)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                style={{ marginLeft: "8px" }}
                                onClick={() => handleDelete(staff.id)}
                                startIcon={<Delete />}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          );
                        }
                        if (column.id === "avatar") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <img
                                src={staff.avatar}
                                alt="Avatar"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "30px",
                                }}
                              />
                            </TableCell>
                          );
                        }
                        if (column.id === "createdAt") {
                          const date = new Date(value);
                          const formattedDate = `${date.getDate()}/${date.getMonth() +
                            1}/${date.getFullYear()}`;
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {formattedDate}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={staffs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

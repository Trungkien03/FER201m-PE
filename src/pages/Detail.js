import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { StaffContext } from "../staffs/StaffContext";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const Detail = () => {

  const { id } = useParams();
  const { staffs } = useContext(StaffContext);

  console.log(staffs);
  const staffDetail = staffs.find((obj) => {
    return obj.id === id;
  });
  if (!staffDetail) {
    return (
      <section className="s-screen flex justify-center items-center">
        Loading....
      </section>
    );
  }
  console.log(staffDetail);

  return (
    <div className="detail-staff">
      <Card sx={{ maxWidth: 1500 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="650"
        image={staffDetail.avatar}
      />
      <CardContent>
        <div className="staff-info">
        <Typography gutterBottom variant="h3" component="div">
          {staffDetail.name}
        </Typography>
        <Typography variant="body1" color="text.info">
        <strong>Address</strong>: {staffDetail.address}
        </Typography>
        <Typography variant="body1" color="text.primary">
          <strong>Age:</strong> {staffDetail.age}
        </Typography>
        <Typography variant="body1" color="text.info">
        <strong>Created At</strong>: {staffDetail.createdAt}
        </Typography>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

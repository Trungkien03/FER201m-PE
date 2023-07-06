


import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { StaffContext } from "../staffs/StaffContext";
const defaultTheme = createTheme();
export const Home = () => {
  const { staffs} = React.useContext(StaffContext);
  console.log(staffs);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              fontFamily={'sans-serif'}
            >
              Staffs List
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {staffs.map((staff) => (
              <Grid item key={staff.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '100%',
                    }}
                    image= {staff.avatar}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {staff.name}
                    </Typography>
                    <Typography>
                      {staff.address}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Button component={Link} to={`/detail/${staff.id}`} size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      
    </ThemeProvider>
  );
}
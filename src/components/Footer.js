import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


export const Footer = () => {
    function Copyright() {
        return (
          <Typography variant="body2" color="white" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }

  return (
    <div>
        {/* Footer */}
      <Box sx={{ bgcolor: '#1976d2', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom color="white">
          Staffs
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="white"
          component="p"
        >
          Staffs Management system for Administrator!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </div>
  )
}

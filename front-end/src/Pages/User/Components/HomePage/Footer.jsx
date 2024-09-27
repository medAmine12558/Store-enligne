import React from 'react';
import { Grid, Typography, Link, Box } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', padding: '20px', marginTop: 'auto' }}>
      <Grid container spacing={4} justifyContent="center">
        {/* About Us Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2">
            We are fozyrstore company, dedicated to providing the best products to our customers.
          </Typography>
        </Grid>

        {/* Contact Us Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">casablanca, barnoussi Kodse</Typography>
          <Typography variant="body2">Email: fozyrstore@gmail.com</Typography>
          <Typography variant="body2">Phone: +212 788993355</Typography>
        </Grid>

        {/* Follow Us Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box display="flex" justifyContent="flex-start" gap={2}>
            <Link href="#" color="inherit">
              <Facebook />
            </Link>
            <Link href="#" color="inherit">
              <Instagram />
            </Link>
            <Link href="#" color="inherit">
              <Twitter />
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright Section */}
      <Box textAlign="center" marginTop="20px">
        <Typography variant="body2" color="textSecondary">
          Copyright © <Link href="#">Fozyr Store</Link> 2025.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

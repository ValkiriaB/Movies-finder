import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 2,
        textAlign: 'center',
        backgroundColor: 'background.paper',
        borderTop: '8px solid',
        borderColor: '#000000',
      }}
    >
      <Typography variant="caption">Hecho por Vale</Typography>
    </Box>
  );
}

export default Footer;



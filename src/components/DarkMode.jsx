import React from 'react';
import { IconButton } from '@mui/material';
import MoonIcon from '../assets/luna.png';
import SunIcon from '../assets/sol.png';

const DarkMode = ({ toggleDarkMode, darkMode }) => {
  return (
    <IconButton
      onClick={toggleDarkMode}
      color="inherit"
      sx={{
        padding: { xs: '6px', sm: '8px' },
        '& img': {
          width: { xs: 20, sm: 25, md: 28 }, // tamaño adaptativo del ícono
          height: 'auto',
        },
      }}
    >
      <img
        src={darkMode ? SunIcon : MoonIcon}
        alt={darkMode ? 'Sun' : 'Moon'}
      />
    </IconButton>
  );
};

export default DarkMode;

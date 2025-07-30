import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setShowFooter(scrollTop + windowHeight >= fullHeight - 10);
    };
    const debounced = debounce(checkScroll, 250);

    window.addEventListener('scroll', debounced);
    // llamar una vez al montar
    checkScroll();

    return () => {
      window.removeEventListener('scroll', debounced);
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#1e1e1e',
        height: '50px',
        width: '100%',
        display: showFooter ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          letterSpacing: '.2rem',
          fontFamily: 'monospace',
          color: 'whiteSmoke',
          textAlign: 'center',
        }}
      >
        Hecho por Vale
      </Typography>
    </Box>
  );
};

export default Footer;



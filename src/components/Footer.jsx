import React, { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const checkScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      setShowFooter(scrollTop + windowHeight >= fullHeight - 10);
    };

    const debounced = debounce(checkScroll, 200);
    window.addEventListener('scroll', debounced);
    checkScroll();

    return () => {
      window.removeEventListener('scroll', debounced);
    };
  }, []);

  return (
    <Box
      role="contentinfo"
      sx={{
        backgroundColor: '#1e1e1e',
        width: '100%',
        py: isMobile ? 1 : 2,
        px: 2,
        display: showFooter ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.3s ease-in-out',
        position: 'relative', // Podés cambiar a 'fixed' si querés que siempre quede abajo
        bottom: 0,
      }}
    >
      <Typography
        variant={isMobile ? 'caption' : 'subtitle2'}
        sx={{
          letterSpacing: '.1rem',
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



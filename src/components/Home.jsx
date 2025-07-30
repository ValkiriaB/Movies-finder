import React from 'react';
import Carousel from "./Carousel";
import MovieList from './ListMovie';
import { Box } from '@mui/material';

function Home() {
  return (
    <>
      <Carousel />
      <Box
        sx={{
          mt: { xs: 2, md: 4 },
          mb: { xs: 4, md: 6 }, // espacio inferior para que no choque con footer
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: { xs: 2, md: 3 }, // menos separación entre listas
          px: { xs: 2, md: 0 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', md: '420px' },
          }}
        >
          <MovieList type="popular" />
        </Box>

        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', md: '420px' },
          }}
        >
          <MovieList type="top_rated" />
        </Box>
      </Box>
    </>
  );
}

export default Home;


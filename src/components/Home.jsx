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
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          mb: 5,
          px: { xs: 2, md: 0 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', md: '750px' },
            mb: { xs: 4, md: 0 },
            ml: { xs: 0, md: '100px' },
          }}
        >
          <MovieList type="popular" />
        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', md: '750px' },
            mr: { xs: 0, md: '100px' },
          }}
        >
          <MovieList type="top_rated" />
        </Box>
      </Box>
    </>
  );
}

export default Home;

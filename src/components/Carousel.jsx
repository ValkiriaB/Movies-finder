import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useMovies from '../Hooks/UseMovie.jsx';

const MovieCarousel = () => {
  const { data, getData } = useMovies();
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    getData('now_playing', 1);
  }, []);

  const handleExpand = (movie) => {
    setExpanded(!expanded);
    setCurrentMovie(expanded && currentMovie === movie ? null : movie);
  };

  return (
    <Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop>
      {data.results &&
        data.results.map((movie) => (
          <Grid key={movie.id}>
            <Card
              sx={{
                position: 'relative',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: { xs: '450px', sm: '500px', md: '600px' },
                borderRadius: 0,
                overflow: 'hidden',
              }}
            >
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: isMobile ? '80px' : '100px',
                  maxWidth: { xs: '90%', md: '800px' },
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  mx: 'auto',
                }}
              >
                <Typography variant="h6" component="div" color="black" fontSize={{ xs: '1rem', md: '1.5rem' }}>
                  {movie.title}
                </Typography>
                {movie.overview ? (
                  expanded && currentMovie === movie ? (
                    <>
                      <Typography variant="body2" color="black" sx={{ my: 1 }}>
                        {movie.overview}
                      </Typography>
                      <Button
                        sx={{ backgroundColor: 'violet', mt: 1 }}
                        variant="contained"
                        size="small"
                        onClick={() => handleExpand(movie)}
                      >
                        Mostrar menos
                      </Button>
                    </>
                  ) : (
                    <Button
                      sx={{ backgroundColor: 'violet', mt: 1 }}
                      variant="contained"
                      size="small"
                      onClick={() => handleExpand(movie)}
                    >
                      Mostrar más
                    </Button>
                  )
                ) : (
                  <Typography variant="body2" color="black">
                    Esta película no tiene descripción.
                  </Typography>
                )}
              </CardContent>

              <Button
                onClick={() => navigate(`/movie/${movie.id}`)}
                sx={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  backgroundColor: 'violet',
                  zIndex: 2
                }}
                variant="contained"
                size="small"
              >
                Más información
              </Button>
            </Card>
          </Grid>
        ))}
    </Carousel>
  );
};

export default MovieCarousel;

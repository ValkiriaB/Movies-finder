import React, { useEffect } from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useNavigate } from 'react-router-dom';
import useMovies from '../Hooks/UseMovie';

const ListMovie = ({ type }) => {
  const { data, getData } = useMovies();
  const navigate = useNavigate();

  useEffect(() => {
    getData(type === 'popular' ? 'popular' : 'top_rated', 1);
  }, [type, getData]);

  return (
    <Box
      border="2px solid #1e1e1e"
      sx={{
        ml: { xs: 0, md: 4 },
        width: { xs: '100%', md: 'auto' },
        maxWidth: { xs: '100%', md: '400px' },
        bgcolor: '#1e1e1e',
        borderRadius: 1,
      }}
    >
      <Typography
        variant="h5"
        padding="12px"
        color="white"
        align="center"
        sx={{
          backgroundColor: '#1e1e1e',
          fontSize: { xs: '1.2rem', md: '1.5rem' },
        }}
      >
        {type === 'popular' ? 'Películas Populares' : 'Películas Más Puntuadas'}
      </Typography>
      <List
        sx={{
          overflowY: 'auto',
          maxHeight: { xs: '300px', md: '430px' },
          bgcolor: '#121212',
        }}
      >
        {data.results &&
          data.results.map((movie, index) => (
            <React.Fragment key={movie.id}>
              <ListItem
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 1,
                  py: 0.5,
                }}
                divider={index < data.results.length - 1}
                secondaryAction={
                  <Button
                    sx={{
                      color: 'violet',
                      borderRadius: '40px',
                      minWidth: '36px',
                      padding: '6px',
                      '&:hover': { backgroundColor: 'rgba(186, 104, 200, 0.2)' },
                    }}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    aria-label={`Ver más sobre ${movie.title}`}
                  >
                    <ChevronRightRoundedIcon />
                  </Button>
                }
              >
                <ListItemAvatar sx={{ minWidth: { xs: 40, md: 56 } }}>
                  <Avatar
                    alt={movie.title}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    sx={{ width: { xs: 40, md: 56 }, height: { xs: 60, md: 84 } }}
                    variant="rounded"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={movie.title}
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: { fontSize: { xs: '0.9rem', md: '1rem' }, color: 'white' },
                  }}
                />
              </ListItem>
            </React.Fragment>
          ))}
      </List>
    </Box>
  );
};

export default ListMovie;

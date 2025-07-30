import React, { useEffect } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  useTheme,
} from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useNavigate } from "react-router-dom";
import useMovies from "../Hooks/UseMovie";

const ListMovie = ({ type }) => {
  const { data, getData, loading, error } = useMovies();
  const navigate = useNavigate();
  const theme = useTheme();

  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    getData(type === "popular" ? "popular" : "top_rated", 1);
  }, [type, getData]);

  if (loading)
    return (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
        Cargando...
      </Typography>
    );

  if (error)
    return (
      <Typography variant="body1" sx={{ color: "red", textAlign: "center", mt: 2 }}>
        {error}
      </Typography>
    );

  return (
    <Box
      sx={{
        ml: { xs: 0, md: 0 },
        width: "100%",
        maxWidth: "100%",
        borderRadius: 2,
        bgcolor: isDark ? "#1e1e1e" : "#ffffff",
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h5"
        padding="12px"
        align="center"
        sx={{
          fontWeight: 600,
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          color: isDark ? "white" : "black",
        }}
      >
        {type === "popular"
          ? "Películas Populares"
          : "Películas Más Puntuadas"}
      </Typography>
      <List
        sx={{
          overflowY: "auto",
          maxHeight: { xs: "320px", md: "480px" },
          bgcolor: isDark ? "#121212" : "#f4f4f4",
        }}
      >
        {data.results &&
          data.results.map((movie, index) => (
            <ListItem
              key={movie.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 1,
                py: 0.5,
              }}
              divider={index < data.results.length - 1}
              secondaryAction={
                <Button
                  sx={{
                    color: "violet",
                    borderRadius: "40px",
                    minWidth: "36px",
                    padding: "6px",
                    "&:hover": { backgroundColor: "rgba(186, 104, 200, 0.2)" },
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
                  sx: {
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: isDark ? "white" : "black",
                  },
                }}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default ListMovie;

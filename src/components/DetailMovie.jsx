// src/pages/DetailMovie.jsx
import React, { useEffect, useState } from 'react';
import useMovies from "../Hooks/UseMovie";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useFavorites } from "../context/FavoritesContext";

const DetailMovie = () => {
  const { id } = useParams();
  const { getData, data, getVideo } = useMovies();
  const [video, setVideo] = useState(null);
  const { addFavorite, removeFavorite, isFavorite, syncFavorites } = useFavorites();
  const [isFavoriteMovie, setIsFavoriteMovie] = useState(false);
  const [trailerError, setTrailerError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const fetchData = async () => {
      await getData(id);
      const videoKey = await getVideo(id);
      setVideo(videoKey);
      if (!videoKey) setTrailerError(true);
    };
    fetchData();
  }, [id, getData, getVideo]);

  useEffect(() => {
    setIsFavoriteMovie(isFavorite(id));
  }, [id, isFavorite]);

  const handleFavoriteToggle = async () => {
    if (buttonDisabled) return;
    setButtonDisabled(true);

    if (isFavoriteMovie) {
      await removeFavorite(id);
    } else {
      await addFavorite({
        id: data.id,
        title: data.title,
        poster_path: data.poster_path,
      });
    }

    setIsFavoriteMovie(!isFavoriteMovie);
    syncFavorites();
    setButtonDisabled(false);
  };

  if (!data) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 8 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 1000,
          bgcolor: isDark ? "rgba(30,30,30,0.9)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          borderRadius: 3,
          boxShadow: 8,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
          sx={{
            width: { xs: "100%", md: "40%" },
            height: { xs: "auto", md: "100%" },
            objectFit: "cover",
            flexShrink: 0,
          }}
        />

        <Box
          sx={{
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              color={isDark ? "white" : "text.primary"}
            >
              {data.title}
            </Typography>

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              color={isDark ? "white" : "text.primary"}
            >
              Descripción General:
            </Typography>
            <Typography
              variant="body1"
              paragraph
              color={isDark ? "white" : "text.secondary"}
            >
              {data.overview}
            </Typography>

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              color={isDark ? "white" : "text.primary"}
            >
              Géneros:
            </Typography>
            <Typography
              variant="body2"
              color={isDark ? "white" : "text.secondary"}
            >
              {data.genres?.map((genre) => genre.name).join(", ")}
            </Typography>
          </CardContent>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 3 }}
            flexWrap="wrap"
            justifyContent="flex-start"
          >
            {video && (
              <Button
                variant="outlined"
                color="primary"
                href={`https://www.youtube.com/watch?v=${video}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textTransform: "none" }}
              >
                Ver Trailer
              </Button>
            )}
            {trailerError && (
              <Typography
                variant="body2"
                color={isDark ? "white" : "text.error"}
              >
                Esta película no posee trailer.
              </Typography>
            )}
            <Button
              onClick={handleFavoriteToggle}
              variant={isFavoriteMovie ? "contained" : "outlined"}
              color={isFavoriteMovie ? "success" : "primary"}
              startIcon={
                isFavoriteMovie ? <CheckCircleOutlineIcon /> : <StarIcon />
              }
              disabled={buttonDisabled}
              sx={{ textTransform: "none" }}
            >
              {isFavoriteMovie
                ? "Añadido a Favoritos"
                : "Agregar a Favoritos"}
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default DetailMovie;

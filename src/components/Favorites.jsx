import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  useMediaQuery
} from "@mui/material";
import { useFavorites } from "../context/FavoritesContext";
import CardMovie from "./CardMovie";
import NoFavoritesImage from "../assets/Notfound.png";
import { useTheme } from "@mui/material/styles";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRemoveFavorite = (movieId) => {
    removeFavorite(movieId);
  };

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 6 }}>
      <Typography
        variant="h5"
        p={3}
        mt={4}
        mb={2}
        textAlign="center"
        sx={{
          fontWeight: "bold",
          color: "#ba68c8",
          fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
        }}
      >
        Tus Películas Favoritas
      </Typography>

      {favorites.length === 0 ? (
        <Box textAlign="center">
          <Typography
            variant="h6"
            color="textSecondary"
            mt={4}
            sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
          >
            Aún no agregaste ninguna película en favoritos.
          </Typography>
          <img
            src={NoFavoritesImage}
            alt="No Favorites"
            style={{ maxWidth: "100%", marginTop: 20 }}
          />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardMovie
                  title={movie.title}
                  poster={movie.poster_path}
                  movieId={movie.id}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth={isMobile}
                      onClick={() => handleRemoveFavorite(movie.id)}
                      sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                    >
                      Quitar de Favoritos
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesPage;

import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Pagination } from "@mui/material";
import useMovies from "../Hooks/UseMovie";
import CardMovie from "./CardMovie";

const Popular = () => {
  const [page, setPage] = useState(1);
  const { data, getData } = useMovies();

  useEffect(() => {
    getData("popular", 1);
  }, [getData]);

  const handlePageChange = (event, value) => {
    setPage(value);
    getData("popular", value);
  };

  return (
    <Box
      p={{ xs: 2, sm: 3, md: 4 }}
      maxWidth="1200px"
      mx="auto"
      sx={{ minHeight: "80vh" }}
    >
      <Typography
        variant="h5"
        mb={4}
        textAlign="center"
        sx={{ fontWeight: "bold", color: "#ba68c8" }}
      >
        Películas Populares
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {data.results &&
          data.results.map((movie) => (
            <Grid
              item
              key={movie.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex" }}
            >
              <CardMovie
                title={movie.title}
                poster={movie.poster_path}
                movieId={movie.id}
                style={{ flexGrow: 1 }}
              />
            </Grid>
          ))}
      </Grid>

      <Box mt={6} mb={4} display="flex" justifyContent="center">
        <Pagination
          count={data.total_pages}
          page={page}
          onChange={handlePageChange}
          siblingCount={1}
          boundaryCount={1}
          size="medium"
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: "bold",
            },
            "& .MuiPaginationItem-page:hover": {
              backgroundColor: "#ba68c8",
              color: "white",
            },
            "& .Mui-selected": {
              backgroundColor: "#ba68c8",
              color: "white",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Popular;

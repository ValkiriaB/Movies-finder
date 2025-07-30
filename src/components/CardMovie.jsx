import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const CardMovie = ({ title, poster, movieId }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 370,
        width: '100%',
        height: '100%',
        marginBottom: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        boxShadow: 3,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
        }
      }}
    >
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={title}
        sx={{
          height: { xs: 400, sm: 450, md: 500 },
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            variant="subtitle1"
            component="div"
            noWrap
            sx={{
              flex: 1,
              minWidth: 0,
              fontWeight: 600,
              pr: 1,
            }}
          >
            {title}
          </Typography>
          <Button
            onClick={handleButtonClick}
            sx={{
              color: "violet",
              borderRadius: "50%",
              minWidth: 0,
              padding: "6px",
            }}
          >
            <ChevronRightRoundedIcon />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardMovie;



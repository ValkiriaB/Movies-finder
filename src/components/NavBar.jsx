import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkMode from './DarkMode';
import Img from '../assets/entrada-de-cine.png';
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Ultimos Lanzamientos', 'Popular', 'Buscador'];

const NavBar = ({ toggleDarkMode, darkMode }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const showFavorites = true;

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: darkMode ? '#1e1e1e' : '#fff',
        color: darkMode ? 'whiteSmoke' : 'black',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* LOGO + TÍTULO */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: darkMode ? 'whiteSmoke' : 'black'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={Img} alt="entrada-de-cine" width={50} height={50} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  ml: 2,
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  letterSpacing: '.2rem',
                  color: darkMode ? 'whiteSmoke' : 'black'
                }}
              >
                Movies Finder
              </Typography>
            </Box>
          </Link>

          {/* MENÚ RESPONSIVE */}
          {isMobile ? (
            <>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: darkMode ? 'whiteSmoke' : 'black' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                  Home
                </MenuItem>
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    component={Link}
                    to={`/${page === 'Ultimos Lanzamientos' ? 'ultimoslanzamientos' : page.toLowerCase()}`}
                    onClick={handleCloseNavMenu}
                  >
                    {page}
                  </MenuItem>
                ))}
                {showFavorites && (
                  <MenuItem
                    component={Link}
                    to="/favorites"
                    onClick={handleCloseNavMenu}
                  >
                    Favoritos
                  </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    color: darkMode ? 'whiteSmoke' : 'black',
                    textTransform: 'none'
                  }}
                >
                  Home
                </Button>
              </Link>
              {pages.map((page) => (
                <Link
                  key={page}
                  to={`/${page === 'Ultimos Lanzamientos' ? 'ultimoslanzamientos' : page.toLowerCase()}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    sx={{
                      color: darkMode ? 'whiteSmoke' : 'black',
                      textTransform: 'none'
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
              {showFavorites && (
                <Link to="/favorites" style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      color: darkMode ? 'whiteSmoke' : 'black',
                      textTransform: 'none'
                    }}
                  >
                    Favoritos
                  </Button>
                </Link>
              )}
              <DarkMode toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

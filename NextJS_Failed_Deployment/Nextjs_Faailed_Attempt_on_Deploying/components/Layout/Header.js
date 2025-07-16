'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Tooltip,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, CameraAlt, Brightness4, Brightness7 } from '@mui/icons-material';

const Header = ({ mode, setMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = [
    { label: 'Browse Photographers', href: '/' },
    // { label: 'About', href: '/about' },
    // { label: 'Contact', href: '/contact' }
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.label} component={Link} href={item.href} onClick={handleDrawerToggle}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box 
              component={Link} 
              href="/" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': { opacity: 0.8 }
              }}
            >
              <CameraAlt sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                Pixisphere
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 3 }}>
                {navigationItems.map((item) => (
                  <Typography
                    key={item.label}
                    component={Link}
                    href={item.href}
                    sx={{
                      textDecoration: 'none',
                      color: theme.palette.text.primary,
                      fontWeight: 500,
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Box>
            )}

            {/* Dark Mode Toggle */}
            <Tooltip title="Toggle light/dark mode">
              <IconButton onClick={() => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))}>
                {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>

          {/* Center Gradient Text */}
          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: '600px',
                fontSize: '2rem',
                background: 'linear-gradient(90deg, #00c6ff, #ff6ec4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              Maternity Photographers in{' '}
              <Box component="span" sx={{ color: 'primary.main', display: 'inline' }}>
                Bengaluru
              </Box>
            </Typography>
          </Box>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;

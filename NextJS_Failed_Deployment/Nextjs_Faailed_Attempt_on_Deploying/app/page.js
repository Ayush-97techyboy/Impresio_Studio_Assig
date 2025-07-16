'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { PhotoProvider } from '../contexts/PhotoContext';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/Filters/FilterSidebar';
import PhotographerGrid from '../components/PhotographerGrid';
import SmartSuggestions from '../components/SmartSuggestions';

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mode, setMode] = useState('light');

  // Load mode from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('themeMode');
    if (stored) setMode(stored);
  }, []);

  // Save mode to localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PhotoProvider>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Header mode={mode} setMode={setMode} />

          <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {/* Maternity Photographers in{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  Bengaluru
                </Box> */}
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
              >
                Find the perfect photographer for your special moments. Browse through our curated list of professional photographers.
              </Typography>
            </Box>

            {/* Search Bar */}
            <SearchBar />

            {/* Smart Suggestions */}
            <SmartSuggestions />

            <Box sx={{ display: 'flex', gap: 3 }}>
              {/* Filter Sidebar */}
              <FilterSidebar 
                isOpen={isFilterOpen} 
                onClose={() => setIsFilterOpen(false)} 
              />

              {/* Main Content */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                {/* Mobile Filter Button */}
                {isMobile && (
                  <Box sx={{ mb: 3 }}>
                    <Button
                      variant="outlined"
                      startIcon={<FilterList />}
                      onClick={() => setIsFilterOpen(true)}
                      sx={{ borderRadius: 2 }}
                    >
                      Filters
                    </Button>
                  </Box>
                )}

                {/* Photographer Grid */}
                <PhotographerGrid />
              </Box>
            </Box>
          </Container>

          <Footer />
        </Box>
      </PhotoProvider>
    </ThemeProvider>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { FilterList, Close, ExpandMore } from '@mui/icons-material';
import { usePhoto } from '../../contexts/PhotoContext';
import PriceRangeSlider from './PriceRangeSlider';
import RatingFilter from './RatingFilter';
import StylesFilter from './StylesFilter';
import CityFilter from './CityFilter';
import SortingFilter from './SortingFilter';

const FilterSidebar = ({ isOpen, onClose }) => {
  const { filters, updateFilters } = usePhoto();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const clearAllFilters = () => {
    updateFilters({
      search: '',
      priceRange: [0, 25000],
      rating: 0,
      styles: [],
      city: '',
      sortBy: 'rating-high'
    });
  };

  const hasActiveFilters = 
    filters.search !== '' ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 25000 ||
    filters.rating !== 0 ||
    filters.styles.length > 0 ||
    filters.city !== '' ||
    filters.sortBy !== 'rating-high';

  const filterSections = [
    { title: 'Price Range', component: <PriceRangeSlider /> },
    { title: 'Minimum Rating', component: <RatingFilter /> },
    { title: 'Photography Styles', component: <StylesFilter /> },
    { title: 'City', component: <CityFilter /> },
    { title: 'Sort By', component: <SortingFilter /> }
  ];

  const sidebarContent = (
    <Box sx={{ width: isMobile ? 280 : 320, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        p: 2, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {hasActiveFilters && (
            <Button
              size="small"
              onClick={clearAllFilters}
              sx={{ textTransform: 'none' }}
            >
              Clear All
            </Button>
          )}
          {isMobile && (
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {filterSections.map((section, index) => (
          <Accordion 
            key={section.title} 
            defaultExpanded 
            elevation={0}
            sx={{ 
              '&:before': { display: 'none' },
              backgroundColor: 'transparent'
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore />}
              sx={{ px: 0, minHeight: 48 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {section.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0 }}>
              {section.component}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={isOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        width: 320,
        flexShrink: 0,
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        height: 'fit-content',
        position: 'sticky',
        top: 0,
      }}
    >
      {sidebarContent}
    </Box>
  );
};

export default FilterSidebar;
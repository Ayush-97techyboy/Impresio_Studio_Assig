'use client';

import React from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { usePhoto } from '../../contexts/PhotoContext';

const PriceRangeSlider = () => {
  const { filters, updateFilters } = usePhoto();

  const handleChange = (event, newValue) => {
    updateFilters({ priceRange: newValue });
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <Box sx={{ px: 1 }}>
      <Box sx={{ 
        textAlign: 'center', 
        mb: 3, 
        p: 2, 
        backgroundColor: 'background.default', 
        borderRadius: 2 
      }}>
        <Typography variant="body2" color="text.secondary">
          {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
        </Typography>
      </Box>
      
      <Slider
        value={filters.priceRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={formatPrice}
        min={0}
        max={25000}
        step={1000}
        sx={{ mb: 2 }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          ₹0
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ₹25,000
        </Typography>
      </Box>
    </Box>
  );
};

export default PriceRangeSlider;
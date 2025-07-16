'use client';

import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { usePhoto } from '../../contexts/PhotoContext';

const SortingFilter = () => {
  const { filters, updateFilters } = usePhoto();

  const sortOptions = [
    { value: 'rating-high', label: 'Rating: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'recently-added', label: 'Recently Added' }
  ];

  const handleChange = (event) => {
    updateFilters({ sortBy: event.target.value });
  };

  return (
    <FormControl fullWidth>
      <Select
        value={filters.sortBy}
        onChange={handleChange}
        size="small"
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortingFilter;
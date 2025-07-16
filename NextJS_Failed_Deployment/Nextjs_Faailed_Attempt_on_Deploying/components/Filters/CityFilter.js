'use client';

import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { usePhoto } from '../../contexts/PhotoContext';

const CityFilter = () => {
  const { filters, updateFilters, photographers } = usePhoto();

  // Get unique cities from photographers
  const cities = Array.from(new Set(photographers.map(p => p.location))).sort();

  const handleChange = (event) => {
    updateFilters({ city: event.target.value });
  };

  return (
    <FormControl fullWidth>
      <Select
        value={filters.city}
        onChange={handleChange}
        displayEmpty
        size="small"
      >
        <MenuItem value="">All Cities</MenuItem>
        {cities.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CityFilter;
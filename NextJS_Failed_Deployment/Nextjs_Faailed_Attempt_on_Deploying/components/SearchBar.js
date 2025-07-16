'use client';

import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import { usePhoto } from '../contexts/PhotoContext';

const SearchBar = () => {
  const { filters, updateFilters } = usePhoto();
  const [searchTerm, setSearchTerm] = useState(filters.search);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ search: searchTerm });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, updateFilters]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name, location, or specialization..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            fontSize: '1.1rem',
            py: 1,
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
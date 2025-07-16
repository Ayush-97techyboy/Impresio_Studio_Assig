'use client';

import React from 'react';
import { 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Box, 
  Rating,
  Typography 
} from '@mui/material';
import { usePhoto } from '../../contexts/PhotoContext';

const RatingFilter = () => {
  const { filters, updateFilters } = usePhoto();

  const ratingOptions = [
    { value: 0, label: 'All Ratings', stars: 0 },
    { value: 3, label: '3+ Stars', stars: 3 },
    { value: 4, label: '4+ Stars', stars: 4 },
    { value: 4.5, label: '4.5+ Stars', stars: 4.5 }
  ];

  const handleChange = (event) => {
    updateFilters({ rating: parseFloat(event.target.value) });
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup value={filters.rating} onChange={handleChange}>
        {ratingOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {option.stars > 0 && (
                  <Rating value={Math.floor(option.stars)} readOnly size="small" />
                )}
                <Typography variant="body2">{option.label}</Typography>
              </Box>
            }
            sx={{ mb: 0.5 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RatingFilter;
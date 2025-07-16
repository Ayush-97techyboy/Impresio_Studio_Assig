'use client';

import React from 'react';
import { 
  FormGroup, 
  FormControlLabel, 
  Checkbox 
} from '@mui/material';
import { usePhoto } from '../../contexts/PhotoContext';

const StylesFilter = () => {
  const { filters, updateFilters } = usePhoto();

  const styleOptions = [
    'Traditional',
    'Candid',
    'Studio',
    'Outdoor',
    'Indoor'
  ];

  const handleChange = (style) => {
    const updatedStyles = filters.styles.includes(style)
      ? filters.styles.filter(s => s !== style)
      : [...filters.styles, style];
    
    updateFilters({ styles: updatedStyles });
  };

  return (
    <FormGroup>
      {styleOptions.map((style) => (
        <FormControlLabel
          key={style}
          control={
            <Checkbox
              checked={filters.styles.includes(style)}
              onChange={() => handleChange(style)}
            />
          }
          label={style}
          sx={{ mb: 0.5 }}
        />
      ))}
    </FormGroup>
  );
};

export default StylesFilter;
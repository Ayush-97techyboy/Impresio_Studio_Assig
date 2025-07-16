'use client';

import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { usePhoto } from '../contexts/PhotoContext';

const SmartSuggestions = () => {
  const { photographers, filters } = usePhoto();

  const generateSuggestion = () => {
    if (filters.city && Array.isArray(filters.tags) && filters.tags.length > 0) {
      return `Top-rated ${filters.tags[0].toLowerCase()} photographers in ${filters.city}`;
    }
    if (filters.city) {
      return `Best photographers in ${filters.city}`;
    }
    if (Array.isArray(filters.styles) && filters.styles.length > 0) {
      return `Top ${filters.styles[0].toLowerCase()} photographers`;
    }
    if (filters.rating >= 4) {
      return `Highly rated photographers (${filters.rating}+ stars)`;
    }
    return 'Top-rated photographers near you';
  };

  const topPhotographers = photographers
    .filter(p => p.rating >= 4.5)
    .slice(0, 3);

  return (
    <Paper
      sx={{
        background: 'linear-gradient(135deg, #F6F5F1 0%, #EDEAE6 100%)',
        p: 3,
        mb: 4,
        border: '1px solid #DED8D3',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AutoAwesome sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          AI Smart Suggestion
        </Typography>
      </Box>
      
      <Typography variant="body1" sx={{ mb: 3, color: 'text.primary' }}>
        {generateSuggestion()}
      </Typography>
      
      {topPhotographers.length > 0 && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Recommended:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {topPhotographers.map((photographer) => (
              <Chip
                key={photographer.id}
                label={`${photographer.name} (${photographer.rating}★)`}
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  borderColor: '#DED8D3',
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default SmartSuggestions;

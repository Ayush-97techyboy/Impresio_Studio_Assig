'use client';

import React from 'react';
import { Grid, Typography, Box, CircularProgress, Button, Alert } from '@mui/material';
import { usePhoto } from './contexts/PhotoContext';
// import PhotographerCard from './PhotographerCard';

const PhotographerGrid = () => {
  const { filteredPhotographers, loading, error, loadMorePhotographers, hasMore } = usePhoto();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography color="text.secondary">Loading photographers...</Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 8 }}>
        <Alert severity="error" sx={{ maxWidth: 500, mx: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Error Loading Photographers</Typography>
          <Typography>{error}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Make sure the JSON server is running on port 3001
          </Typography>
        </Alert>
      </Box>
    );
  }

  if (filteredPhotographers.length === 0) {
    return (
      <Box sx={{ py: 8 }}>
        <Alert severity="info" sx={{ maxWidth: 500, mx: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>No Photographers Found</Typography>
          <Typography>
            Try adjusting your filters or search terms to find more photographers.
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Showing {filteredPhotographers.length} photographer{filteredPhotographers.length !== 1 ? 's' : ''}
      </Typography>

      {/* Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {filteredPhotographers.map((photographer) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={photographer.id}>
            <PhotographerCard photographer={photographer} />
          </Grid>
        ))}
      </Grid>

      {/* Load More Button */}
      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={loadMorePhotographers}
            sx={{ px: 4, py: 1.5, borderRadius: 2 }}
          >
            Load More Photographers
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PhotographerGrid;
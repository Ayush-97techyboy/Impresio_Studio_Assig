'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const PhotoContext = createContext(undefined);

export const usePhoto = () => {
  const context = useContext(PhotoContext);
  if (context === undefined) {
    throw new Error('usePhoto must be used within a PhotoProvider');
  }
  return context;
};

export const PhotoProvider = ({ children }) => {
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    priceRange: [0, 25000],
    rating: 0,
    styles: [],
    city: '',
    sortBy: ''
  });
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        setLoading(true);
        // For local development, use hardcoded backend API URL
        const response = await fetch('http://localhost:3001/photographers');
        // TODO: Use environment variable VITE_API_URL for deployment
        if (!response.ok) {
          throw new Error('Failed to fetch photographers');
        }
        const data = await response.json();
        setPhotographers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  const applyFilters = (photographersList) => {
    return photographersList.filter((photographer) => {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (
          !photographer.name.toLowerCase().includes(searchTerm) &&
          !photographer.location.toLowerCase().includes(searchTerm) &&
          !photographer.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        ) {
          return false;
        }
      }
      if (
        photographer.price < filters.priceRange[0] ||
        photographer.price > filters.priceRange[1]
      ) {
        return false;
      }
      if (photographer.rating < filters.rating) {
        return false;
      }
      if (filters.styles.length > 0) {
        const hasStyle = filters.styles.some((style) =>
          photographer.styles.includes(style)
        );
        if (!hasStyle) return false;
      }
      if (filters.city && photographer.location !== filters.city) {
        return false;
      }
      return true;
    });
  };

  const sortPhotographers = (photographersList) => {
    const sorted = [...photographersList];
    switch (filters.sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating-high':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'recently-added':
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
    return sorted;
  };

  const filteredAndSorted = sortPhotographers(applyFilters(photographers));

  const visiblePhotographers = filteredAndSorted.slice(0, displayCount);

  const hasMore = filteredAndSorted.length > displayCount;

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setDisplayCount(6); // Reset display count on filter change
  };

  const loadMorePhotographers = () => {
    // Dummy rendering: just increase displayCount by 3
    setDisplayCount((prev) => prev + 3);
  };

  return (
    <PhotoContext.Provider
      value={{
        photographers,
        filteredPhotographers: visiblePhotographers,
        loading,
        error,
        filters,
        updateFilters,
        loadMorePhotographers,
        hasMore,
        displayCount,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

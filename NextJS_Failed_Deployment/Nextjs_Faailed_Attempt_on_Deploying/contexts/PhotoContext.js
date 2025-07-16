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
  const [displayCount, setDisplayCount] = useState(6);
  const [filters, setFilters] = useState({
    search: '',
    priceRange: [0, 25000],
    rating: 0,
    styles: [],
    city: '',
    sortBy: 'rating-high'
  });

  // Fallback data in case API fails
  const fallbackData = [
    {
      id: 1,
      name: "Ravi Studio",
      location: "Bengaluru",
      price: 10000,
      rating: 4.6,
      styles: ["Outdoor", "Studio"],
      tags: ["Candid", "Maternity"],
      bio: "Award-winning studio specializing in maternity and newborn shoots.",
      profilePic: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      portfolio: [
        "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      reviews: [
        {
          name: "Ananya",
          rating: 5,
          comment: "Truly amazing photos and experience!",
          date: "2024-12-15"
        },
        {
          name: "Priya Sharma",
          rating: 4.5,
          comment: "Professional service and beautiful pictures. Highly recommended!",
          date: "2024-11-20"
        }
      ]
    },
    {
      id: 2,
      name: "Lens Queen Photography",
      location: "Delhi",
      price: 15000,
      rating: 4.2,
      styles: ["Candid", "Indoor"],
      tags: ["Newborn", "Birthday"],
      bio: "Delhi-based candid specialist for kids and birthday parties.",
      profilePic: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      portfolio: [
        "https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1519861/pexels-photo-1519861.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      reviews: [
        {
          name: "Priya",
          rating: 4,
          comment: "Very professional and punctual!",
          date: "2024-10-01"
        }
      ]
    },
    {
      id: 3,
      name: "Click Factory",
      location: "Mumbai",
      price: 8000,
      rating: 4.8,
      styles: ["Studio", "Outdoor", "Traditional"],
      tags: ["Wedding", "Pre-wedding"],
      bio: "Capturing timeless wedding stories across India.",
      profilePic: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      portfolio: [
        "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      reviews: [
        {
          name: "Rahul",
          rating: 5,
          comment: "We loved every single moment they captured.",
          date: "2025-01-22"
        }
      ]
    },
    {
      id: 4,
      name: "Moments by Neha",
      location: "Bengaluru",
      price: 12000,
      rating: 4.3,
      styles: ["Outdoor", "Candid"],
      tags: ["Maternity", "Couple"],
      bio: "Natural light specialist focusing on emotional storytelling.",
      profilePic: "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=400",
      portfolio: [
        "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      reviews: [
        {
          name: "Sneha",
          rating: 4.5,
          comment: "Captured our maternity journey so beautifully.",
          date: "2024-11-05"
        }
      ]
    },
    {
      id: 5,
      name: "Snapshot Studio",
      location: "Hyderabad",
      price: 7000,
      rating: 3.9,
      styles: ["Studio"],
      tags: ["Birthday", "Family"],
      bio: "Affordable indoor shoots with creative themes.",
      profilePic: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
      portfolio: [
        "https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1519861/pexels-photo-1519861.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      reviews: [
        {
          name: "Vikram",
          rating: 3.5,
          comment: "Decent service, could improve on punctuality.",
          date: "2024-09-10"
        }
      ]
    },
    {
      id: 6,
      name: "Artistic Visions",
      location: "Chennai",
      price: 18000,
      rating: 4.7,
      styles: ["Traditional", "Candid", "Outdoor"],
      tags: ["Wedding", "Maternity", "Family"],
      bio: "Chennai's premier photography studio with 10+ years of experience.",
      profilePic: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400",
      portfolio: [
        "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      reviews: [
        {
          name: "Lakshmi",
          rating: 5,
          comment: "Exceptional quality and creativity!",
          date: "2024-12-01"
        }
      ]
    },
    {
      id: 7,
      name: "Digital Dreams",
      location: "Pune",
      price: 9500,
      rating: 4.1,
      styles: ["Candid", "Studio"],
      tags: ["Birthday", "Corporate", "Event"],
      bio: "Specializing in corporate events and birthday celebrations.",
      profilePic: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400",
      portfolio: [
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      reviews: [
        {
          name: "Arjun",
          rating: 4,
          comment: "Great service for corporate events.",
          date: "2024-10-15"
        }
      ]
    },
    {
      id: 8,
      name: "Perfect Moments",
      location: "Kolkata",
      price: 11000,
      rating: 4.4,
      styles: ["Traditional", "Indoor"],
      tags: ["Wedding", "Traditional", "Family"],
      bio: "Traditional photography specialists in Kolkata.",
      profilePic: "https://images.pexels.com/photos/1181319/pexels-photo-1181319.jpeg?auto=compress&cs=tinysrgb&w=400",
      portfolio: [
        "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      reviews: [
        {
          name: "Sita",
          rating: 4.5,
          comment: "Beautiful traditional photography style.",
          date: "2024-11-10"
        }
      ]
    }
  ];

  // Fetch photographers from API or use fallback data
  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from API first
        try {
          const response = await fetch('/api/photographers');
          if (response.ok) {
            const data = await response.json();
            setPhotographers(data || fallbackData);
          } else {
            throw new Error('API not available');
          }
        } catch (apiError) {
          console.warn('API not available, using fallback data:', apiError);
          setPhotographers(fallbackData);
        }
        
      } catch (err) {
        console.error('Error fetching photographers:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setPhotographers(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  // Filter and sort photographers
  const getFilteredPhotographers = () => {
    let filtered = photographers.filter(photographer => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          photographer.name.toLowerCase().includes(searchTerm) ||
          photographer.location.toLowerCase().includes(searchTerm) ||
          photographer.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        if (!matchesSearch) return false;
      }

      // Price range filter
      if (photographer.price < filters.priceRange[0] || photographer.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (photographer.rating < filters.rating) {
        return false;
      }

      // Styles filter
      if (filters.styles.length > 0) {
        const hasMatchingStyle = filters.styles.some(style => 
          photographer.styles.includes(style)
        );
        if (!hasMatchingStyle) return false;
      }

      // City filter
      if (filters.city && photographer.location !== filters.city) {
        return false;
      }

      return true;
    });

    // Sort filtered results
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-high':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'recently-added':
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered.slice(0, displayCount);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setDisplayCount(6); // Reset display count when filters change
  };

  const loadMorePhotographers = () => {
    setDisplayCount(prev => prev + 6);
  };

  const filteredPhotographers = getFilteredPhotographers();
  const allFiltered = photographers.filter(photographer => {
    // Apply all filters except display count to check if there are more
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = 
        photographer.name.toLowerCase().includes(searchTerm) ||
        photographer.location.toLowerCase().includes(searchTerm) ||
        photographer.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      if (!matchesSearch) return false;
    }

    if (photographer.price < filters.priceRange[0] || photographer.price > filters.priceRange[1]) {
      return false;
    }

    if (photographer.rating < filters.rating) {
      return false;
    }

    if (filters.styles.length > 0) {
      const hasMatchingStyle = filters.styles.some(style => 
        photographer.styles.includes(style)
      );
      if (!hasMatchingStyle) return false;
    }

    if (filters.city && photographer.location !== filters.city) {
      return false;
    }

    return true;
  });

  const hasMore = allFiltered.length > displayCount;

  return (
    <PhotoContext.Provider
      value={{
        photographers,
        filteredPhotographers,
        loading,
        error,
        filters,
        updateFilters,
        loadMorePhotographers,
        hasMore,
        displayCount
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
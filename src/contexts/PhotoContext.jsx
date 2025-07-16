'use client';

import React, { createContext, useContext, useState } from 'react';

const PhotoContext = createContext(undefined);

export const usePhoto = () => {
  const context = useContext(PhotoContext);
  if (context === undefined) {
    throw new Error('usePhoto must be used within a PhotoProvider');
  }
  return context;
};

// Static photographers data from db.json embedded here
const staticPhotographers = [
  {
    "id": 1,
    "name": "Ravi Studio",
    "location": "Bengaluru",
    "price": 10000,
    "rating": 4.6,
    "styles": [
      "Outdoor",
      "Studio"
    ],
    "tags": [
      "Candid",
      "Maternity"
    ],
    "bio": "Award-winning studio specializing in maternity and newborn shoots.",
    "profilePic": "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    "portfolio": [
      "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    "reviews": [
      {
        "name": "Ananya",
        "rating": 5,
        "comment": "Truly amazing photos and experience!",
        "date": "2024-12-15"
      }
    ]
  },
  {
    "id": 2,
    "name": "Lens Queen Photography",
    "location": "Delhi",
    "price": 15000,
    "rating": 4.2,
    "styles": [
      "Candid",
      "Indoor"
    ],
    "tags": [
      "Newborn",
      "Birthday"
    ],
    "bio": "Delhi-based candid specialist for kids and birthday parties.",
    "profilePic": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    "portfolio": [
      "https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1519861/pexels-photo-1519861.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    "reviews": [
      {
        "name": "Priya",
        "rating": 4,
        "comment": "Very professional and punctual!",
        "date": "2024-10-01"
      }
    ]
  },
  {
    "id": 3,
    "name": "Click Factory",
    "location": "Mumbai",
    "price": 8000,
    "rating": 4.8,
    "styles": [
      "Studio",
      "Outdoor",
      "Traditional"
    ],
    "tags": [
      "Wedding",
      "Pre-wedding"
    ],
    "bio": "Capturing timeless wedding stories across India.",
    "profilePic": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    "portfolio": [
      "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    "reviews": [
      {
        "name": "Rahul",
        "rating": 5,
        "comment": "We loved every single moment they captured.",
        "date": "2025-01-22"
      }
    ]
  },
  {
    "id": 4,
    "name": "Moments by Neha",
    "location": "Bengaluru",
    "price": 12000,
    "rating": 4.3,
    "styles": [
      "Outdoor",
      "Candid"
    ],
    "tags": [
      "Maternity",
      "Couple"
    ],
    "bio": "Natural light specialist focusing on emotional storytelling.",
    "profilePic": "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=400",
    "portfolio": [
      "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    "reviews": [
      {
        "name": "Sneha",
        "rating": 4.5,
        "comment": "Captured our maternity journey so beautifully.",
        "date": "2024-11-05"
      }
    ]
  },
  {
    "id": 5,
    "name": "Snapshot Studio",
    "location": "Hyderabad",
    "price": 7000,
    "rating": 3.9,
    "styles": [
      "Studio"
    ],
    "tags": [
      "Birthday",
      "Family"
    ],
    "bio": "Affordable indoor shoots with creative themes.",
    "profilePic": "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
    "portfolio": [
      "https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1519861/pexels-photo-1519861.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    "reviews": [
      {
        "name": "Vikram",
        "rating": 3.5,
        "comment": "Decent service, could improve on punctuality.",
        "date": "2024-09-10"
      }
    ]
  }
];

export const PhotoProvider = ({ children }) => {
  const [photographers, setPhotographers] = useState(staticPhotographers);
  const [loading, setLoading] = useState(false);
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

  // Removed fetch useEffect since data is static

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

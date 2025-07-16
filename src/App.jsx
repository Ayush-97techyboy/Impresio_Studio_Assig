import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import PhotographerCard from "./components/PhotographerCard";
import FiltersSidebar from "./components/FiltersSidebar";
import SearchBar from "./components/SearchBar";
import AISmartSuggestion from "./components/AISmartSuggestion";
import PhotographerProfilePage from "./components/PhotographerProfilePage";
import Layout from "./components/Layout";
import { usePhoto } from "./contexts/PhotoContext";

function App() {
  const {
    filteredPhotographers,
    loading,
    error,
    filters,
    updateFilters,
    hasMore,
    loadMorePhotographers,
  } = usePhoto();

  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [loadMoreClickCount, setLoadMoreClickCount] = useState(0);

  const handleFilterChange = (key, value) => {
    updateFilters({ [key]: value });
  };

  const handleSearchChange = (value) => {
    updateFilters({ search: value });
  };

  const handleViewProfile = (photographer) => {
    setSelectedPhotographer(photographer);
  };

  const handleBackToListing = () => {
    setSelectedPhotographer(null);
  };

  const handleLoadMoreClick = () => {
    loadMorePhotographers();
    setLoadMoreClickCount((prev) => prev + 1);
  };

  if (loading) {
    return (
      <Layout>
        <Box sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h6">Loading photographers...</Typography>
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Box>
      </Layout>
    );
  }

  if (selectedPhotographer) {
    return (
      <Layout>
        <PhotographerProfilePage
          photographer={selectedPhotographer}
          onBack={handleBackToListing}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {/* Filters Sidebar */}
        <FiltersSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          cities={Array.from(
            new Set(
              filteredPhotographers
                .map((p) => p.location)
                .filter(Boolean)
            )
          )}
          sx={{ width: { xs: "100%", sm: "300px" }, marginBottom: { xs: 2, sm: 0 } }}
        />

        {/* Main Listing Content */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Find the perfect photographer for your special moments. Browse through our curated list of professional photographers.
          </Typography>

          <SearchBar searchTerm={filters.search} onSearchChange={handleSearchChange} />

          <AISmartSuggestion
            suggestions={filteredPhotographers.slice(0, 2)}
            onSelect={handleViewProfile}
          />

          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Showing {filteredPhotographers.length} photographers
          </Typography>

          <Box
            key={loadMoreClickCount}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(auto-fit, minmax(100%, 1fr))",
                sm: "repeat(auto-fit, minmax(250px, 1fr))",
                md: "repeat(auto-fit, minmax(300px, 1fr))",
              },
              gap: "1.5rem",
            }}
          >
            {filteredPhotographers.length > 0 ? (
              filteredPhotographers.map((photographer) => (
                <PhotographerCard
                  key={photographer.id}
                  photographer={photographer}
                  onViewProfile={handleViewProfile}
                />
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", marginTop: "2rem" }}
              >
                No photographers found matching the filters.
              </Typography>
            )}
          </Box>
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Typography variant="body2">Debug Info:</Typography>
            <Typography variant="body2">hasMore: {hasMore ? "true" : "false"}</Typography>
            <Typography variant="body2">
              Visible Photographers: {filteredPhotographers.length}
            </Typography>
          </Box>
          {!hasMore ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button variant="contained" onClick={handleLoadMoreClick}>
                Load More Photographers
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Typography variant="body2" color="textSecondary">
                No more photographers to load. (Simulated)
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
}

export default App;

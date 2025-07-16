import React from "react";
import {
  Box,
  Typography,
  Slider,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const FiltersSidebar = ({ filters, onFilterChange, cities }) => {
  const stylesOptions = ["Traditional", "Candid", "Studio", "Outdoor"];

  return (
    <Box
      sx={{
        flex: "0 0 300px",
        padding: "1.5rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(102, 126, 234, 0.3)",
        color: "#fff",
      }}
    >
      <Typography variant="h6" component="h2" sx={{ marginBottom: "1rem", fontWeight: "bold" }}>
        Filters
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "600" }}>Price Range:</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <Typography variant="body2">₹0</Typography>
        <Typography variant="body2">₹20000</Typography>
      </Box>
      <Slider
        value={filters.priceRange}
        onChange={(e, value) => onFilterChange("priceRange", value)}
        min={0}
        max={20000}
        // valueLabelDisplay="on"
        // valueLabelFormat={(value) => `₹${value}`}
        sx={{ marginBottom: "1rem", color: "#fff" }}
      />
      <Typography variant="body1" sx={{ fontWeight: "600" }}>Rating:</Typography>
      <Select
        value={filters.rating}
        onChange={(e) => onFilterChange("rating", e.target.value)}
        fullWidth
        sx={{ marginBottom: "1rem", color: "#333", backgroundColor: "#fff", borderRadius: 1 }}
      >
        <MenuItem value={0}>All</MenuItem>
        <MenuItem value={4}>4+</MenuItem>
        <MenuItem value={3}>3+</MenuItem>
      </Select>
      <Typography variant="body1" sx={{ fontWeight: "600" }}>Styles:</Typography>
      {stylesOptions.map((style) => (
        <FormControlLabel
          key={style}
          control={
            <Checkbox
              checked={filters.styles.includes(style)}
              onChange={(e) => {
                const selectedStyles = filters.styles.includes(style)
                  ? filters.styles.filter((s) => s !== style)
                  : [...filters.styles, style];
                onFilterChange("styles", selectedStyles);
              }}
              sx={{ color: "#fff" }}
            />
          }
          label={style}
          sx={{ color: "#fff" }}
        />
      ))}
      <Typography variant="body1" sx={{ fontWeight: "600" }}>City:</Typography>
      <Select
        value={filters.city}
        onChange={(e) => onFilterChange("city", e.target.value)}
        displayEmpty
        fullWidth
        sx={{ marginBottom: "1rem", color: "#333", backgroundColor: "#fff", borderRadius: 1 }}
      >
        <MenuItem value="">
          <em>All Cities</em>
        </MenuItem>
        {(cities || []).map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="body1" sx={{ fontWeight: "600" }}>Sort By:</Typography>
      <Select
        value={filters.sortBy === "" || filters.sortBy === undefined ? "" : filters.sortBy}
        onChange={(e) => onFilterChange("sortBy", e.target.value)}
        displayEmpty
        fullWidth
        sx={{ color: "#333", backgroundColor: "#fff", borderRadius: 1 }}
        renderValue={(selected) => {
          if (selected === "") {
            return <em>None</em>;
          }
          const options = {
            "price-low": "Price: Low to High",
            "rating-high": "Rating: High to Low",
            "recently-added": "Recently Added",
          };
          return options[selected] || selected;
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="price-low">Price: Low to High</MenuItem>
        <MenuItem value="rating-high">Rating: High to Low</MenuItem>
        <MenuItem value="recently-added">Recently Added</MenuItem>
      </Select>
    </Box>
  );
};


export default FiltersSidebar;

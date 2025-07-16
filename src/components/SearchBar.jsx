import React, { useState, useEffect } from "react";
import { TextField, Box } from "@mui/material";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const [value, setValue] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value, onSearchChange]);

  useEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        fullWidth
        placeholder="Search by name, location, or tag"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export default SearchBar;

import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";

const AISmartSuggestion = ({ suggestions, onSelect }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f0eee9",
        padding: 2,
        borderRadius: 2,
        marginBottom: 3,
      }}
    >
      <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}>
        <span role="img" aria-label="sparkles">✨</span> Smart Suggestion
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        Top-rated outdoor maternity photographers in Bengaluru
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {suggestions.map((photographer) => (
          <Chip
            key={photographer.id}
            label={`${photographer.name} (${photographer.rating.toFixed(1)}★)`}
            onClick={() => onSelect(photographer)}
            clickable
          />
        ))}
      </Box>
    </Box>
  );
};

export default AISmartSuggestion;

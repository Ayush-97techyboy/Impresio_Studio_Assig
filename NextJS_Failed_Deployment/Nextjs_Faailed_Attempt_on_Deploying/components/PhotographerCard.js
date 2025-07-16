"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Rating,
  useTheme,
} from "@mui/material";
import { LocationOn, CameraAlt } from "@mui/icons-material";

const PhotographerCard = ({ photographer }) => {
  const theme = useTheme();

  const formatPrice = (price) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <Card
      sx={{
        height: "100",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardMedia
        component="img"
        height="100"
        image={photographer.profilePic}
        alt={photographer.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            {photographer.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOn
              sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              {photographer.location}
            </Typography>
          </Box>
        </Box>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Rating
            value={photographer.rating}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
            {photographer.rating} ({photographer.reviews.length} review
            {photographer.reviews.length !== 1 ? "s" : ""})
          </Typography>
        </Box>

        {/* Price */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 700, color: theme.palette.primary.main }}
          >
            {formatPrice(photographer.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            starting price
          </Typography>
        </Box>

        {/* Styles */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <CameraAlt sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {photographer.styles.join(", ")}
          </Typography>
        </Box>

        {/* Tags */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            mb: 3,
            flexGrow: 1,
          }}
        >
          {photographer.tags.slice(0, 3).map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                backgroundColor: theme.palette.custom?.timberwolf || "#DBD7D2",
                color: theme.palette.text.primary,
                fontSize: "0.75rem",
              }}
            />
          ))}
          {photographer.tags.length > 3 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ alignSelf: "center" }}
            >
              +{photographer.tags.length - 3} more
            </Typography>
          )}
        </Box>

        {/* View Profile Button */}
        {/* <div className="photographer-card">
      <h3>{photographer.name}</h3>
      <p>{photographer.bio}</p>
      <Link href={`/profile?photographerId=${photographer.id}`}> <Button>View Profile</Button>
      </Link>
    </div> */}
        <Button
          component={Link}
          href={`/profile?photographerId=${photographer.id}`}
          target="_blank"
          variant="contained"
          fullWidth
          sx={{
            mt: "auto",
            borderRadius: 2,
            py: 1.5,
            fontWeight: 600,
          }}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default PhotographerCard;

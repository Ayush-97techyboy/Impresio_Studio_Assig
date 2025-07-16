import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Skeleton,
} from "@mui/material";

const PhotographerCard = ({ photographer, onViewProfile }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    // Show image only after component mounts to avoid flicker
    setShowImage(true);
  }, []);

  const imageUrl =
    !imgError && photographer.profilePic
      ? photographer.profilePic
      : "https://via.placeholder.com/300x140?text=No+Image";

  return (
    <Card
      sx={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* 🔹 Skeleton loader */}
      {!imgLoaded && <Skeleton variant="rectangular" width="100%" height={140} animation="wave" />}

      {showImage && (
        <CardMedia
          component="img"
          height="350px"
          image={imageUrl}
          alt={`${photographer.name} profile`}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgError(true);
            setImgLoaded(true);
          }}
          sx={{
            display: imgLoaded ? "block" : "none",
            objectFit: "cover",
          }}
        />
      )}

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {photographer.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {photographer.location}
        </Typography>
        <Typography variant="body2">Starting Price: ₹{photographer.price}</Typography>
        <Typography variant="body2">Rating: {photographer.rating}</Typography>

        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
          }}
        >
          {(photographer.tags || []).map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>

        <Button
          variant="contained"
          sx={{ marginTop: "1rem" }}
          onClick={() => onViewProfile(photographer)}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default PhotographerCard;

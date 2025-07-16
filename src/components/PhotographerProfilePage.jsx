import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Modal,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const PhotographerProfilePage = ({ photographer, onBack }) => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");

  if (!photographer) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6">No photographer selected.</Typography>
        {/* <Button variant="contained" onClick={onBack} sx={{ marginTop: 2 }}>
          Back to Listing
        </Button> */}
      </Box>
    );
  }

  const handleInquiryOpen = () => setInquiryOpen(true);
  const handleInquiryClose = () => setInquiryOpen(false);

  const handleInquirySend = () => {
    // For now, just close modal and clear form
    setInquiryName("");
    setInquiryMessage("");
    setInquiryOpen(false);
    alert("Inquiry sent!");
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* <Button variant="outlined" onClick={onBack} sx={{ marginBottom: 3 }}>
        {"< Back to Listing"}
      </Button> */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box>
            <CardMedia
              component="img"
              image={photographer.profilePic || "https://via.placeholder.com/300x300?text=No+Image"}
              alt={photographer.name}
              sx={{ borderRadius: 2, maxWidth: "100%" }}
            />
            <Typography variant="h5" sx={{ marginTop: 2 }}>
              {photographer.name}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              {photographer.bio || "No bio available."}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              <strong>Location:</strong> {photographer.location || "N/A"}
            </Typography>
            <Typography variant="body2">
              <strong>Price:</strong> ₹{photographer.price || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              <strong>Styles:</strong>{" "}
              {(photographer.styles || []).map((style) => (
                <Chip key={style} label={style} size="small" sx={{ mr: 0.5 }} />
              ))}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              <strong>Tags:</strong>{" "}
              {(photographer.tags || []).map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5 }} />
              ))}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Gallery
          </Typography>
          <Grid container spacing={2}>
            {(photographer.portfolio || []).map((img, idx) => (
              <Grid item xs={4} key={idx}>
                <Card>
                  <CardMedia
                    component="img"
                    image={img || "https://via.placeholder.com/300x120?text=No+Image"}
                    alt={"Portfolio image " + (idx + 1)}
                    sx={{ height: 120, objectFit: "cover" }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
            Reviews
          </Typography>
          {(photographer.reviews && photographer.reviews.length > 0) ? (
            photographer.reviews.map((review, idx) => (
              <Paper
                key={idx}
                sx={{ padding: 2, marginBottom: 2, borderRadius: 2 }}
                elevation={1}
              >
                <Typography variant="subtitle2">{review.name}</Typography>
                <Typography variant="body2">
                  Rating: {review.rating} | Date: {review.date}
                </Typography>
                <Typography variant="body2">{review.comment}</Typography>
              </Paper>
            ))
          ) : (
            <Typography>No reviews yet.</Typography>
          )}

          <Button
            variant="contained"
            sx={{ marginTop: 3 }}
            onClick={handleInquiryOpen}
          >
            Send Inquiry
          </Button>

          <Modal
            open={inquiryOpen}
            onClose={handleInquiryClose}
            aria-labelledby="inquiry-modal-title"
            aria-describedby="inquiry-modal-description"
          >
            <Box sx={{ position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  cursor: "pointer",
                  zIndex: 10,
                }}
                onClick={handleInquiryClose}
                aria-label="Close inquiry modal"
              >
                &#x2715;
              </Box>
              <Box
                sx={{
                  ...style,
                  paddingBottom: 6,
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  flexGrow: 1,
                }}
              >
                <Typography id="inquiry-modal-title" variant="h6" component="h2">
                  Send Inquiry
                </Typography>
                <TextField
                  fullWidth
                  label="Name"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  sx={{ marginTop: 2 }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  sx={{ marginTop: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleInquirySend}
                  sx={{ marginTop: 2 }}
                  disabled={!inquiryName || !inquiryMessage}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PhotographerProfilePage;

"use client";

import React, { useState, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Button,
  Modal,
  TextField,
  IconButton,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ShareIcon from '@mui/icons-material/Share';
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useSearchParams } from "next/navigation";
import db from "../db.json";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [mode, setMode] = useState("light");

  const searchParams = useSearchParams();
  const photographerId = parseInt(searchParams.get("photographerId"), 10);
  const photographer = db.photographers.find((p) => p.id === photographerId);

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  if (!photographer) {
    return (
      <Container>
        <Typography variant="h4" color="error" textAlign="center">
          Photographer not found.
        </Typography>
      </Container>
    );
  }

  const handleFormSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
    }, 3000);
  };

  const filteredImages = photographer.portfolio.filter(Boolean);

  const handleShare = (img) => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this image",
        url: img,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(img);
      alert("Image URL copied to clipboard!");
    }
  };

  const openImageModal = (index) => {
    setSelectedIndex(index);
    setIsZoomOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Header mode={mode} setMode={setMode} />
        <Container maxWidth="lg" sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={10}>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Card sx={{ borderRadius: 4 }}>
                    <CardMedia
                      component="img"
                      image={photographer.profilePic}
                      alt={photographer.name}
                      sx={{ height: { xs: 300, md: 400 }, objectFit: "cover", borderRadius: 2 }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h4" fontWeight="bold">Gallery</Typography>
                    <IconButton onClick={() => openImageModal(0)}>
                      <FullscreenIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {filteredImages.map((img, i) => (
                      <Box
                        key={i}
                        onClick={() => openImageModal(i)}
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: 2,
                          overflow: "hidden",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        <img
                          src={img}
                          alt={`Gallery Image ${i + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        <Tooltip title="Share">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(img);
                            }}
                            size="small"
                            sx={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.5)", color: "white" }}
                          >
                            <ShareIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, maxWidth: 900 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>{photographer.name}</Typography>
            <Typography color="text.secondary" gutterBottom>{photographer.bio}</Typography>
            <Typography><strong>Location:</strong> {photographer.location}</Typography>
            <Typography><strong>Price:</strong> ₹{photographer.price}</Typography>
            <Typography><strong>Styles:</strong> {photographer.styles.join(", ")}</Typography>
            <Typography><strong>Tags:</strong> {photographer.tags.join(", ")}</Typography>
          </Box>

          <Box sx={{ mt: 4, maxWidth: 900, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold">Reviews</Typography>
            {photographer.reviews.map((review, i) => (
              <Card key={i} sx={{ mb: 2, borderRadius: 4 }}>
                <Box sx={{ p: 2 }}>
                  <Typography fontWeight="bold">{review.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Rating: {review.rating} | Date: {review.date}</Typography>
                  <Typography variant="body2">{review.comment}</Typography>
                </Box>
              </Card>
            ))}
          </Box>

          <Box sx={{ mt: 4, maxWidth: 900, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold">Send Inquiry</Typography>
            <Button variant="contained" color="primary" size="large" onClick={() => setIsModalOpen(true)} sx={{ mt: 2 }}>Send Inquiry</Button>
          </Box>

          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 4 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6">Send Inquiry</Typography>
                <IconButton onClick={() => setIsModalOpen(false)}><CloseIcon /></IconButton>
              </Box>
              {isSubmitted ? (
                <Typography color="success.main" textAlign="center">Inquiry submitted successfully!</Typography>
              ) : (
                <>
                  <TextField fullWidth label="Name" variant="outlined" sx={{ mb: 2 }} />
                  <TextField fullWidth label="Message" variant="outlined" multiline rows={4} sx={{ mb: 2 }} />
                  <Button variant="contained" color="primary" fullWidth onClick={handleFormSubmit}>Submit</Button>
                </>
              )}
            </Box>
          </Modal>

          {isZoomOpen && (
            <Modal open={isZoomOpen} onClose={() => setIsZoomOpen(false)}>
              <Box sx={{ 
                position: "absolute", 
                top: "50%", 
                left: "50%", 
                transform: "translate(-50%, -50%)", 
                maxWidth: "90vw", 
                maxHeight: "90vh",
                bgcolor: "background.paper", 
                boxShadow: 24, 
                p: 2, 
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: '100%', mb: 2 }}>
                  <Typography variant="h6">Image Gallery</Typography>
                  <IconButton onClick={() => setIsZoomOpen(false)}><CloseIcon /></IconButton>
                </Box>
                <img
                  src={filteredImages[selectedIndex]}
                  alt={`Gallery Image ${selectedIndex + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "70vh",
                    objectFit: "contain",
                  }}
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {filteredImages.map((img, i) => (
                    <Box
                      key={i}
                      onClick={() => setSelectedIndex(i)}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        overflow: "hidden",
                        cursor: "pointer",
                        border: selectedIndex === i ? '2px solid primary.main' : '2px solid transparent',
                      }}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Modal>
          )}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default ProfilePage;
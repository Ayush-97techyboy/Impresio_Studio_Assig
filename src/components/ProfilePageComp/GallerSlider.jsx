import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import Lightbox from "yet-another-react-lightbox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";

const GallerySlider = ({ portfolio, lightboxOpen, setLightboxOpen, currentIndex, setCurrentIndex }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const handleImageClick = (idx) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>Gallery</Typography>
      {portfolio.length > 0 ? (
        <>
          <Slider {...sliderSettings}>
            {portfolio.map((img, idx) => (
              <Box
                key={idx}
                sx={{ px: 1, cursor: "pointer", display: "flex", justifyContent: "center" }}
                onClick={() => handleImageClick(idx)}
              >
                <img
                  src={img || "https://via.placeholder.com/300x120?text=No+Image"}
                  alt={`Portfolio ${idx + 1}`}
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                />
              </Box>
            ))}
          </Slider>
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={currentIndex}
            slides={portfolio.map((img) => ({ src: img }))}
          />
        </>
      ) : (
        <Typography variant="body2">No portfolio images available.</Typography>
      )}
    </>
  );
};

export default GallerySlider;
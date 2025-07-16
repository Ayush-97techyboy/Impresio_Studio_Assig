import { Box, Typography, Chip, CardMedia } from "@mui/material";

const ProfileInfo = ({ photographer }) => (
  <Box>
    <CardMedia
      component="img"
      image={photographer.profilePic || "https://via.placeholder.com/300x300?text=No+Image"}
      alt={photographer.name}
      sx={{ borderRadius: 2, maxWidth: "100%" }}
    />
    <Typography variant="h5" sx={{ mt: 2 }}>{photographer.name}</Typography>
    <Typography variant="body1" sx={{ mt: 1 }}>{photographer.bio || "No bio available."}</Typography>
    <Typography variant="body2" sx={{ mt: 1 }}><strong>Location:</strong> {photographer.location || "N/A"}</Typography>
    <Typography variant="body2"><strong>Price:</strong> ₹{photographer.price || "N/A"}</Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>
      <strong>Styles:</strong>{" "}
      {(photographer.styles || []).map(style => (
        <Chip key={style} label={style} size="small" sx={{ mr: 0.5 }} />
      ))}
    </Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>
      <strong>Tags:</strong>{" "}
      {(photographer.tags || []).map(tag => (
        <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5 }} />
      ))}
    </Typography>
  </Box>
);

export default ProfileInfo;
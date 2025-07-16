import { Typography, Paper } from "@mui/material";

const ReviewList = ({ reviews }) => (
  <>
    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Reviews</Typography>
    {reviews && reviews.length > 0 ? (
      reviews.map((review, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2, borderRadius: 2 }} elevation={1}>
          <Typography variant="subtitle2">{review.name}</Typography>
          <Typography variant="body2">Rating: {review.rating} | Date: {review.date}</Typography>
          <Typography variant="body2">{review.comment}</Typography>
        </Paper>
      ))
    ) : (
      <Typography>No reviews yet.</Typography>
    )}
  </>
);

export default ReviewList;
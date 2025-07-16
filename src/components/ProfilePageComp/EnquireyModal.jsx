import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const InquiryModal = ({ open, onClose, name, setName, message, setMessage, onSend }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={style}>
      <Typography variant="h6">Send Inquiry</Typography>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Message"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        onClick={onSend}
        sx={{ mt: 2 }}
        disabled={!name || !message}
      >
        Send
      </Button>
    </Box>
  </Modal>
);

export default InquiryModal;
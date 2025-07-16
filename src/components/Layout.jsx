import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Changed from "sm" to "md" to include tablet

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
      <Box
        sx={{
          width: 250,
          backgroundColor: "#fff",
          height: "100%",
          color: "#000",
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem button={true} component="a" href="#about">
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button={true} component="a" href="#contact">
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",  // Changed back to "wrap" to allow wrapping
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          gap: 1,
        }}
      >
        <Button
          href="/"
          sx={{
            display: "flex",
            color: "inherit",
            textDecoration: "none",
            fontSize: { xs: "18px", sm: "24px" },
            flexGrow: 0,
            minWidth: 120,
            order: 1,
          }}
        >
          Pixisphere
        </Button>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                order: { xs: 1, sm: 3 },
                marginLeft: { xs: "auto", sm: "auto" },
                marginTop: { xs: 0, sm: "auto" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: { backgroundColor: "#fff", color: "#000" },
              }}
            >
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, order: 3 }}>
            <Button color="inherit" href="#about">
              About
            </Button>
            <Button color="inherit" href="#contact">
              Contact
            </Button>
          </Box>
        )}

        <Typography
          variant="h5"
          component="h1"
          sx={{
            flexGrow: { xs: 0, sm: 1 },
            flexShrink: 1,
            minWidth: { xs: "auto", sm: 200 },
            textAlign: { xs: "left", sm: "center", lg : "center" },
            fontSize: { xs: "1rem", sm: "1.5rem" },
            whiteSpace: "normal",
            overflowWrap: "break-word",
            lineHeight: 1.2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "flex-start", sm: "center" },
            margin: { xs: 0, sm: "0 auto" },
            order: { xs: 2, sm: 2 },
          }}
        >
          Maternity Photographers in
          <br />
          Bengaluru
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, backgroundColor: "#f9f9fb", color: "#333", padding: 3 }}>
        {children}

        {/* Load More Photographers Button */}
        {/* {typeof hasMore !== "undefined" && hasMore && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
            <Button
              variant="contained"
              onClick={loadMore}
              disabled={loading}
              sx={{ px: 4, py: 1.5, borderRadius: 2 }}
            >
              {loading ? "Loading..." : "Load More Photographers"}
            </Button>
          </Box>
        )} */}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #764ba2 0%, #667eea 100%)",
          color: "#fff",
          padding: "1.5rem",
          textAlign: "center",
          marginTop: "auto",
          boxShadow: "0 -2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="body2" sx={{ mb: 1 }}>
          © 2025 Pixisphere. All rights reserved.
        </Typography>
        <Box>
          <Button color="inherit" sx={{ textTransform: "none" }}>
            Contact Us
          </Button>
          <Button color="inherit" sx={{ textTransform: "none" }}>
            Cities Covered
          </Button>
          <Button color="inherit" sx={{ textTransform: "none" }}>
            Services
          </Button>
          <Button color="inherit" sx={{ textTransform: "none" }}>
            Privacy
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;


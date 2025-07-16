'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme
} from '@mui/material';
import { CameraAlt, Email, Phone, LocationOn } from '@mui/icons-material';
import theme from '../../theme/theme';

const Footer = () => {
  const footerSections = [
    {
      title: 'Services',
      items: [
        'Maternity Photography',
        'Newborn Shoots',
        'Birthday Photography',
        'Wedding Photography',
        'Family Portraits'
      ]
    },
    {
      title: 'Cities Covered',
      items: [
        'Bengaluru',
        'Mumbai',
        'Delhi',
        'Chennai',
        'Hyderabad'
      ]
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.custom.darkBrown,
        color: '#FFFFFF',
        py: 6,
        mt: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CameraAlt sx={{ mr: 1, color: theme.palette.custom.isabelline }} />
              <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                Pixisphere
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, color: theme.palette.custom.isabelline2 }}>
              Connecting customers with the best photographers and studios for maternity, 
              newborn, birthday, and special shoots.
            </Typography>
          </Grid>

          {/* Services and Cities */}
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={2} key={section.title}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                {section.title}
              </Typography>
              <List dense>
                {section.items.map((item) => (
                  <ListItem key={item} disablePadding>
                    <ListItemText 
                      primary={
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.palette.custom.isabelline2,
                            '&:hover': { color: theme.palette.custom.isabelline }
                          }}
                        >
                          {item}
                        </Typography>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}

          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: theme.palette.custom.isabelline }} />
                <Typography variant="body2" sx={{ color: theme.palette.custom.isabelline2 }}>
                  hello@pixisphere.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: theme.palette.custom.isabelline }} />
                <Typography variant="body2" sx={{ color: theme.palette.custom.isabelline2 }}>
                  +91 98765 43210
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: theme.palette.custom.isabelline }} />
                <Typography variant="body2" sx={{ color: theme.palette.custom.isabelline2 }}>
                  India
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.custom.mediumBrown}`,
            mt: 4,
            pt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.custom.isabelline2 }}>
            © 2025 Pixisphere. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <Typography
                key={item}
                component={Link}
                href="#"
                variant="body2"
                sx={{
                  color: theme.palette.custom.isabelline2,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.custom.isabelline }
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
// CONTACT US

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    setSnackbar({
      open: true,
      message: 'Your message has been sent successfully!',
      severity: 'success'
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };
  
  // Updated contactDetails: now each detail includes a "link" property.
  const contactDetails = [
    {
      icon: <PhoneIcon sx={{ color: '#00B2B2', fontSize: 28 }} />,
      title: 'Phone',
      details: ['011 - 26907550'],
      link: 'tel:011-26907550'
    },
    {
      icon: <EmailIcon sx={{ color: '#00B2B2', fontSize: 28 }} />,
      title: 'Email',
      details: ['alok@iiitd.ac.in'],
      link: 'mailto:alok@iiitd.ac.in'
    },
    {
      icon: <LocationIcon sx={{ color: '#00B2B2', fontSize: 28 }} />,
      title: 'Address',
      details: ['A-303, Academic Building, Okhla Industrial Estate, Phase IIIT-D'],
      link: 'https://www.google.com/maps/search/?api=1&query=A-303,+Academic+Building,+Okhla+Industrial+Estate,+Phase+IIIT-D'
    },
    {
      icon: <LanguageIcon sx={{ color: '#00B2B2', fontSize: 28 }} />,
      title: 'Office E-Mail',
      details: ['info@iiitd.ac.in'],
      link: 'mailto:info@iiitd.ac.in'
    }
  ];
  
  const socialMedia = [
    { icon: <FacebookIcon />, name: 'Facebook' },
    { icon: <TwitterIcon />, name: 'Twitter' },
    { icon: <InstagramIcon />, name: 'Instagram' },
    { icon: <LinkedInIcon />, name: 'LinkedIn' }
  ];
  
  return (
    <Box sx={{ bgcolor: 'white' }}>
      {/* Hero Section */}
      <Box className="hero-section" minHeight='20vh'>
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="overline" className="service-label">
              Information
            </Typography>
            <Typography variant="h1" className="hero-title">
              Contact Us
            </Typography>
            <Typography variant="body1" className="hero-description">
              Connect with our team for personalized support, answers to your queries, and collaboration opportunities. 
            </Typography>
          </Box>         
        </Container>       
      </Box>
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Contact Info Cards */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {contactDetails.map((detail, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                elevation={0}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    borderColor: '#00B2B2'
                  }
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {detail.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    {detail.title}
                  </Typography>
                  {detail.details.map((item, idx) =>
                    detail.link ? (
                      <a
                        key={idx}
                        href={detail.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {item}
                        </Typography>
                      </a>
                    ) : (
                      <Typography key={idx} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {item}
                      </Typography>
                    )
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Main Content: Form and Map - FIXED EQUAL HEIGHT */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Contact Form */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: '12px', 
                border: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%' // ensures full height
              }}
            >
              <Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
                Send Us a Message
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Have a question or want to work together? Fill out the form below, and we'll get back to you as soon as possible.
              </Typography>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Grid container spacing={3} sx={{ flexGrow: 1, alignContent: 'flex-start' }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={4}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 'auto' }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large"
                      sx={{
                        bgcolor: '#00B2B2',
                        '&:hover': {
                          bgcolor: '#009494',
                        },
                        px: 4,
                        py: 1.5,
                        borderRadius: '8px',
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Box>
          
          {/* Map */}
          <Box 
            sx={{
              flex: 1
            }}
          >
            <Paper 
              elevation={0} 
              sx={{ 
                p: 0, 
                borderRadius: '12px', 
                border: '1px solid #e0e0e0',
                height: '100%',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ height: '100%', position: 'relative' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9584425776574!2d77.27072131492844!3d28.544076982452995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e564daac1d%3A0x2c582e340e7bc556!2sIIIT-Delhi%20R%26D%20Building!5e0!3m2!1sen!2sin!4v1645524815197!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                  title="Location Map"
                />
                
                {/* Info Box overlay on the map */}
                <Box 
                  sx={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    maxWidth: '300px',
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    p: 3,
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    display: isMobile ? 'none' : 'block'
                  }}
                >
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1, color: '#00B2B2' }}>
                    IIIT-Delhi R&D Building
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                    A-303, Academic Building, Okhla Industrial Estate, Phase - 3
                  </Typography>
                  <Button 
                    variant="outlined"
                    size="small"
                    startIcon={<LocationIcon />}
                    href="https://www.google.com/maps/dir/?api=1&destination=$IIITD" 
                    target="_blank"
                    sx={{
                      borderColor: '#00B2B2',
                      color: '#00B2B2',
                      '&:hover': {
                        borderColor: 'black',
                        bgcolor: '#E6FFFF'
                      }
                    }}
                  >
                    Get Directions
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;
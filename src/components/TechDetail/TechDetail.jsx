// TechDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Chip,
  Paper,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LinkIcon from "@mui/icons-material/Link";
import DescriptionIcon from "@mui/icons-material/Description";
import SchoolIcon from "@mui/icons-material/School";
import CategoryIcon from "@mui/icons-material/Category";
import { motion } from "framer-motion";
import logo from "../../assets/iiitdlogo.png";
import Footer from "../Footer/Footer";

// IIITD Theme
const iiitdTheme = createTheme({
  palette: {
    primary: {
      main: "#2A9D8F", // IIITD teal/green color from login page
      light: "#4DB6A9",
      dark: "#1E7268",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#264653", // Darker complementary color
      light: "#3A5F6F",
      dark: "#1A323C",
      contrastText: "#FFFFFF"
    },
    background: {
      default: "#F5F7F8",
      paper: "#FFFFFF"
    },
    text: {
      primary: "#333333",
      secondary: "#5F6368"
    },
    divider: "#E0E0E0"
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.2
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.4
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6
    }
  },
  shape: {
    borderRadius: 4
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 4,
          fontWeight: 500
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500
        }
      }
    }
  }
});

// TechCard Component
const TechCard = ({ tech }) => (
  <motion.div
    whileHover={{ 
      y: -4,
      transition: { duration: 0.2 }
    }}
  >
    <RouterLink
      to={`/tech/${tech.id}`}
      style={{ textDecoration: "none" }}
    >
      <Paper 
        elevation={1}
        sx={{
          height: '100%',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: 3,
            borderLeft: '4px solid #2A9D8F'
          },
          wordBreak: 'break-word'
        }}
      >
        <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 500, 
              mb: 1,
              display: 'block'
            }}
          >
            {tech.docket}
          </Typography>
          
          <Typography
            variant="h6"
            sx={{ 
              fontWeight: 600,
              mb: 1.5,
              color: 'text.primary'
            }}
          >
            {tech.name}
          </Typography>
          
          <Typography
            variant="body2"
            sx={{ 
              mb: 2,
              color: 'text.secondary',
              flexGrow: 1
            }}
          >
            {tech.description}
          </Typography>
          
          <Box sx={{ mt: 'auto' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                display: 'block',
                mb: 0.5,
                color: 'text.primary'
              }}
            >
              {tech.innovators}
            </Typography>
            
            <Typography 
              variant="caption" 
              color="text.secondary"
            >
              Genre: {tech.genre}
            </Typography>
          </Box>
        </CardContent>
      </Paper>
    </RouterLink>
  </motion.div>
);

// Loading Skeleton Component
const LoadingState = () => (
  <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
    <Box sx={{ textAlign: "center" }}>
      <CircularProgress size={60} sx={{ color: "#2A9D8F", mb: 2 }} />
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Loading technology details...
      </Typography>
    </Box>
  </Container>
);

export default function TechDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tech, setTech] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedTechs, setRelatedTechs] = useState([]);
  const isMobile = useMediaQuery(iiitdTheme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(iiitdTheme.breakpoints.down('md'));

  // Fetch main technology details
  useEffect(() => {
    const fetchTechDetails = async () => {
      try {
        const res = await fetch(`http://192.168.1.148:4000/technologies/${id}`);
        if (!res.ok) {
          throw new Error("Technology not found");
        }
        const data = await res.json();
        setTech(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching technology:", error);
        setTech(null);
        setLoading(false);
      }
    };
    
    fetchTechDetails();
  }, [id]);

  useEffect(() => {
    if (tech) {
      const fetchRelatedTechs = async () => {
        try {
          const url = new URL("https://192.168.1.148:4000/technologies");
          url.searchParams.set("genres", tech.genre);
          url.searchParams.set("limit", 5);
          
          const res = await fetch(url);
          const data = await res.json();
          
          // Filter out the current technology based on id
          const filtered = (data.data || []).filter((t) => t.id !== tech.id);
          setRelatedTechs(filtered);
        } catch (error) {
          console.error("Error fetching related technologies:", error);
        }
      };
      
      fetchRelatedTechs();
    }
  }, [tech]);

  // Helper function to randomly select a number of items from an array
  const getRandomTechs = (arr, count) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  if (loading) {
    return (
      <ThemeProvider theme={iiitdTheme}>
        <LoadingState />
      </ThemeProvider>
    );
  }

  if (!tech) {
    return (
      <ThemeProvider theme={iiitdTheme}>
        <Container sx={{ mt: 4, textAlign: "center", py: 8, maxWidth: "1200px", mx: "auto" }}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 4, 
              maxWidth: 500,
              mx: 'auto',
              wordBreak: 'break-word'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Technology not found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              The technology you're looking for doesn't exist or has been removed.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIcon />}
            >
              Go Back
            </Button>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  }

  // Get 4 random similar technologies (or fewer if not enough available)
  const similarTechs = getRandomTechs(relatedTechs, Math.min(4, relatedTechs.length));

  return (
    <ThemeProvider theme={iiitdTheme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <AppBar 
          position="sticky"
          elevation={0}
          sx={{ 
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            bgcolor: 'white', 
            borderBottom: '1px solid',
            borderColor: 'divider',
            color: 'text.primary'
          }}
        >
          <Toolbar sx={{ justifyContent: "center" }}>
                    <Box
                      component="img"
                      src={logo}
                      alt="IIIT Delhi Logo"
                      sx={{
                        height: { xs: 40, sm: 50 },
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 }, pb: 6, maxWidth: "1200px", mx: "auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header Section with Technology Name and TRL */}
            <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'white', wordBreak: 'break-word' }}>
              <Box 
                sx={{ 
                  display: "flex", 
                  alignItems: isMobile ? "flex-start" : "center", 
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between", 
                  gap: isMobile ? 1 : 0,
                  mb: 2
                }}
              >
                <Typography
                  variant={isMobile ? "h5" : "h3"}
                  sx={{ 
                    fontWeight: 600, 
                    color: 'text.primary'
                  }}
                >
                  {tech.name}
                </Typography>
                
                <Chip 
                  label={`TRL: ${tech.trl}`} 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: "white", 
                    fontWeight: 500, 
                    fontSize: "0.75rem", 
                    height: 28
                  }} 
                />
              </Box>
              
              <Typography 
                variant="body1" 
                sx={{ color: 'text.secondary', wordBreak: 'break-word' }}
              >
                {tech.overview}
              </Typography>
            </Paper>

            {/* Main Details */}
            <Grid container spacing={3}>
              {/* Left Column: Detailed Description & Technical Specs */}
              <Grid item xs={12} md={8}>
                <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'white', wordBreak: 'break-word' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h5">
                      Detailed Description
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', lineHeight: 1.7, wordBreak: 'break-word' }}
                  >
                    {tech.detailedDescription}
                  </Typography>
                </Paper>
                
                <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'white', wordBreak: 'break-word' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h5">
                      Technical Specifications
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ color: 'text.secondary', lineHeight: 1.7, wordBreak: 'break-word' }}
                  >
                    {tech.technicalSpecifications}
                  </Typography>
                </Paper>
                
                <Paper elevation={0} sx={{ p: 3, bgcolor: 'white', wordBreak: 'break-word' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h5">
                      Overview
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', lineHeight: 1.7, wordBreak: 'break-word' }}
                  >
                    {tech.description}
                  </Typography>
                </Paper>
              </Grid>

              {/* Right Column: Quick Info */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: 'white', wordBreak: 'break-word' }}>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">
                        Genre & Docket
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          Genre:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                          {tech.genre}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={4}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          Docket:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                          {tech.docket}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">
                        Innovators
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Typography 
                      variant="body2" 
                      sx={{ color: 'text.primary', wordBreak: 'break-word' }}
                    >
                      {tech.innovators}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <CheckCircleIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">
                        Advantages
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <List dense disablePadding>
                      {tech.advantages &&
                        tech.advantages.map((adv, index) => (
                          <ListItem key={index} disableGutters sx={{ py: 0.75 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <CheckCircleIcon
                                sx={{ color: 'primary.main' }}
                                fontSize="small"
                              />
                            </ListItemIcon>
                            <ListItemText 
                              primary={adv} 
                              primaryTypographyProps={{ 
                                variant: 'body2',
                                color: 'text.primary',
                                wordBreak: 'break-word'
                              }}
                            />
                          </ListItem>
                        ))}
                    </List>
                  </Box>
                  
                  {isMobile && (
                    <Box sx={{ mt: 3 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBackIcon />}
                      >
                        Back to Technologies
                      </Button>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>

            {/* Applications and Use Cases */}
            <Grid container spacing={3} sx={{ mt: 0.5 }}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: 'white', wordBreak: 'break-word' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h5">
                      Applicationsssssssss
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <List dense disablePadding>
                    {tech.applications &&
                      tech.applications.map((app, index) => (
                        <ListItem key={index} disableGutters sx={{ py: 0.75 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <CheckCircleIcon
                              sx={{ color: 'primary.main' }}
                              fontSize="small"
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={app}
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              color: 'text.primary',
                              wordBreak: 'break-word'
                            }}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: 'white', wordBreak: 'break-word' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h5">
                      Use Cases
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <List dense disablePadding>
                    {tech.useCases &&
                      tech.useCases.map((useCase, index) => (
                        <ListItem key={index} disableGutters sx={{ py: 0.75 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <CheckCircleIcon
                              sx={{ color: 'primary.main' }}
                              fontSize="small"
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={useCase}
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              color: 'text.primary',
                              wordBreak: 'break-word'
                            }}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>

            {/* Related Links */}
            <Paper elevation={0} sx={{ p: 3, mt: 3, bgcolor: 'white', wordBreak: 'break-word' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LinkIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5">
                  Related Links
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                {tech.relatedLinks &&
                  tech.relatedLinks.map((link, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <ListItemButton
                        component="a"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'rgba(42, 157, 143, 0.05)'
                          },
                          wordBreak: 'break-word'
                        }}
                      >
                        <ListItemIcon>
                          <LinkIcon sx={{ color: 'primary.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={link.title}
                          primaryTypographyProps={{ 
                            variant: 'body2',
                            fontWeight: 500,
                            wordBreak: 'break-word'
                          }}
                        />
                      </ListItemButton>
                    </Grid>
                  ))}
              </Grid>
              
              {!isMobile && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBackIcon />}
                  >
                    Back to Technologies
                  </Button>
                </Box>
              )}
            </Paper>
          </motion.div>
        </Container>

        {/* Related Technologies Section */}
        {similarTechs.length > 0 && (
          <Box sx={{ bgcolor: 'rgba(42, 157, 143, 0.05)', py: 5 }}>
            <Container maxWidth="lg" sx={{ maxWidth: "1200px", mx: "auto" }}>
              <Typography
                variant="h5"
                sx={{ 
                  mb: 3, 
                  fontWeight: 600, 
                  textAlign: "center",
                  color: 'text.primary'
                }}
              >
                More Technologieaaaaaaaaaaaas
              </Typography>
              
              <Grid container spacing={3}>
                {similarTechs.map((techItem) => (
                  <Grid item xs={12} sm={6} md={3} key={techItem.id}>
                    <TechCard tech={techItem} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        )}

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

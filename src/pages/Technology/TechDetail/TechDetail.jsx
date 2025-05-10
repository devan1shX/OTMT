import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import ImageIcon from "@mui/icons-material/Image";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import EmailIcon from "@mui/icons-material/Email";
import {
  Typography,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";
import SchoolIcon from "@mui/icons-material/School";

// Image Gallery Dialog Component
const ImageGalleryDialog = ({
  open,
  handleClose,
  images,
  currentIndex,
  handlePrev,
  handleNext,
  baseUrl,
}) => {
  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          overflow: "hidden",
        },
      }}
    >
      <Box sx={{ position: "relative", width: "100%", bgcolor: "black" }}>
        {/* Close button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            bgcolor: "rgba(0,0,0,0.4)",
            zIndex: 10,
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Image container */}
        <Box
          sx={{
            width: "100%",
            height: { xs: "50vh", sm: "70vh" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={`${baseUrl}${currentImage.url}`}
            alt={currentImage.caption || "Gallery image"}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  left: { xs: 8, sm: 16 },
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.4)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                }}
              >
                <ArrowBackIcon />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: { xs: 8, sm: 16 },
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.4)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </>
          )}
        </Box>

        {/* Caption area */}
        {currentImage.caption && (
          <Box sx={{ p: 2, bgcolor: "background.paper" }}>
            <Typography variant="body1" align="center">
              {currentImage.caption}
            </Typography>
            <Typography
              variant="caption"
              align="center"
              sx={{ display: "block", color: "text.secondary", mt: 0.5 }}
            >
              {currentIndex + 1} of {images.length}
            </Typography>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

const InnovatorsSection = ({ tech }) => {
  // Safely check for innovators data
  const innovators =
    tech?.innovators && Array.isArray(tech.innovators) ? tech.innovators : [];

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <SchoolIcon sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h6">Innovators</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {innovators.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {innovators.map((innovator, index) => (
            <ListItemButton
              key={index}
              component="a"
              // href is now always "#" as we are not using mailto links
              href="#"
              sx={{
                width: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 1,
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "rgba(42, 157, 143, 0.05)", // Assuming this color is from your theme or a specific value
                  transform: "translateY(-2px)",
                  boxShadow: 1,
                },
                // If it's not meant to be interactive without the mail link,
                // you might consider removing component="a" and href,
                // or changing hover styles if it's no longer a link.
                // For now, keeping it as a non-navigating link.
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {innovator.name ? innovator.name[0].toUpperCase() : "?"}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={innovator.name || "Unknown Innovator"}
                // Secondary text (email) is now removed
                secondary={null}
              />
            </ListItemButton>
          ))}
        </Box>
      ) : (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontStyle: "italic" }}
        >
          No innovator information available
        </Typography>
      )}
    </Box>
  );
};

// IIITD Theme
const iiitdTheme = createTheme({
  palette: {
    primary: {
      main: "#2A9D8F", // IIITD teal/green color
      light: "#4DB6A9",
      dark: "#1E7268",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#264653", // Darker complementary color
      light: "#3A5F6F",
      dark: "#1A323C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F7F8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#5F6368",
    },
    divider: "#E0E0E0",
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
          padding: "8px 16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Loading Skeleton Component
const LoadingState = () => (
  <Container
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "70vh",
    }}
  >
    <Box sx={{ textAlign: "center" }}>
      <CircularProgress size={60} sx={{ color: "#2A9D8F", mb: 2 }} />
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Loading technology details...
      </Typography>
    </Box>
  </Container>
);

const API_BASE_URL = "https://192.168.1.148:5001";

// Main TechDetail Component
function TechDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tech, setTech] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [relatedTechs, setRelatedTechs] = useState([]);
  const isMobile = useMediaQuery(iiitdTheme.breakpoints.down("sm"));

  // Fetch main technology details
  useEffect(() => {
    const fetchTechDetails = async () => {
      try {
        const res = await fetch(`https://192.168.1.148:4000/technologies/${id}`);
        if (!res.ok) {
          throw new Error("Technology not found");
        }
        const data = await res.json();
        setTech(data);
        setLoading(false);

        // Scroll to top when new tech is loaded
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching technology:", error);
        setTech(null);
        setLoading(false);
      }
    };

    fetchTechDetails();
  }, [id]);

  // In your TechDetail function component, add this before the return statement:
  const handleOpenGallery = (index) => {
    setCurrentImageIndex(index);
    setOpenGallery(true);
  };

  const handleCloseGallery = () => {
    setOpenGallery(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? tech.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === tech.images.length - 1 ? 0 : prev + 1
    );
  };

  // Helper function to safely render arrays
  const renderList = (items) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontStyle: "italic" }}
        >
          No information available
        </Typography>
      );
    }

    return (
      <List dense disablePadding>
        {items.map((item, index) => (
          <ListItem
            key={index}
            disableGutters
            sx={{
              py: 0.75,
              px: 1,
              borderRadius: 1,
              mb: 1,
              bgcolor:
                index % 2 === 0 ? "rgba(42, 157, 143, 0.05)" : "transparent",
            }}
          >
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckCircleIcon
                sx={{ color: "primary.main" }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText
              primary={item}
              primaryTypographyProps={{
                variant: "body2",
                color: "text.primary",
                wordBreak: "break-word",
              }}
            />
          </ListItem>
        ))}
      </List>
    );
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
        <Container
          sx={{
            mt: 4,
            textAlign: "center",
            py: 8,
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 4,
              maxWidth: 500,
              mx: "auto",
              wordBreak: "break-word",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Technology not found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              The technology you're looking for doesn't exist or has been
              removed.
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

  return (
    <ThemeProvider theme={iiitdTheme}>
      <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
        <Box className="hero-section" minHeight="20vh">
          <Container maxWidth="lg">
            <Box
              className="hero-content"
              sx={{
                maxWidth: "100%",
                overflow: "hidden", // hide any overflow if needed
              }}
            >
              <Typography
                variant="overline"
                className="service-label"
                sx={{
                  mr: 1,
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  maxWidth: "100%",
                }}
              >
                {tech.docket}
              </Typography>
              <Typography
                variant="overline"
                className="service-label"
                sx={{
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  maxWidth: "100%",
                }}
              >
                TRL: {tech.trl}
              </Typography>
              <Typography
                variant="h1"
                className="hero-title"
                sx={{
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  maxWidth: "100%",
                  whiteSpace: "normal", // allow wrapping instead of forcing a single line
                }}
              >
                {tech.name}
              </Typography>
              <Typography
                variant="body1"
                className="hero-description"
                sx={{
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  maxWidth: "100%",
                  whiteSpace: "normal", // allow wrapping here as well
                }}
              >
                {tech.overview ||
                  tech.description ||
                  "Innovative technology developed at IIITD"}
              </Typography>
            </Box>
          </Container>
        </Box>

        <Container
          maxWidth="lg"
          sx={{ pt: { xs: 2, md: 3 }, pb: 6, maxWidth: "1200px", mx: "auto" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Main Details */}
            <Grid container spacing={3}>
              {/* Left Column: Detailed Description & Technical Specs */}
              <Grid item xs={12} md={8}>
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    mb: 3,
                    bgcolor: "white",
                    wordBreak: "break-word",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "4px",
                      height: "100%",
                      bgcolor: "primary.light",
                    }}
                  />

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <DescriptionIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="h5">Description</Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.7,
                      wordBreak: "break-word",
                    }}
                  >
                    {tech.detailedDescription ||
                      "No detailed description available"}
                  </Typography>
                </Paper>

                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    mb: 3,
                    bgcolor: "white",
                    wordBreak: "break-word",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "4px",
                      height: "100%",
                      bgcolor: "primary.light",
                    }}
                  />

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <DescriptionIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="h5">
                      Technical Specifications
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.7,
                      wordBreak: "break-word",
                    }}
                  >
                    {tech.technicalSpecifications ||
                      "No technical specifications available"}
                  </Typography>
                </Paper>

                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    bgcolor: "white",
                    wordBreak: "break-word",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "4px",
                      height: "100%",
                      bgcolor: "primary.light",
                    }}
                  />

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <DescriptionIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="h5">Overview</Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.7,
                      wordBreak: "break-word",
                    }}
                  >
                    {tech.description || "No description available"}
                  </Typography>
                </Paper>
              </Grid>

              {/* Right Column: Quick Info */}
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    bgcolor: "white",
                    wordBreak: "break-word",
                    position: "sticky",
                    top: 16,
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <CategoryIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">Technical Details</Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, color: "text.secondary" }}
                        >
                          Genre:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Chip
                          label={tech.genre || "Unspecified"}
                          size="small"
                          sx={{
                            bgcolor: "rgba(42, 157, 143, 0.1)",
                            color: "primary.dark",
                            fontWeight: 500,
                          }}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, color: "text.secondary" }}
                        >
                          Docket:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.primary" }}
                        >
                          {tech.docket || "Not specified"}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, color: "text.secondary" }}
                        >
                          Patent:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.primary" }}
                        >
                          {tech.patent || "Not specified"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <InnovatorsSection tech={tech} />
                  </Box>

                  <Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <CheckCircleIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">Advantages</Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {renderList(tech.advantages)}
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
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    bgcolor: "white",
                    wordBreak: "break-word",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "4px",
                      height: "100%",
                      bgcolor: "primary.light",
                    }}
                  />

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="h5">Applications</Typography>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {renderList(tech.applications)}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    bgcolor: "white",
                    wordBreak: "break-word",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "4px",
                      height: "100%",
                      bgcolor: "primary.light",
                    }}
                  />

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="h5">Use Cases</Typography>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {renderList(tech.useCases)}
                </Paper>
              </Grid>
            </Grid>

            {/* Related Links */}
            <Paper
              elevation={1}
              sx={{
                p: { xs: 2, sm: 3 },
                mt: 3,
                bgcolor: "white",
                wordBreak: "break-word",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "4px",
                  height: "100%",
                  bgcolor: "primary.light",
                }}
              />

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LinkIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h5">Related Links</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                {tech.relatedLinks &&
                Array.isArray(tech.relatedLinks) &&
                tech.relatedLinks.length > 0 ? (
                  tech.relatedLinks.map((link, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <ListItemButton
                        component="a"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1,
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "primary.main",
                            bgcolor: "rgba(42, 157, 143, 0.05)",
                          },
                          wordBreak: "break-word",
                        }}
                      >
                        <ListItemIcon>
                          <LinkIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={link.title}
                          primaryTypographyProps={{
                            variant: "body2",
                            fontWeight: 500,
                            wordBreak: "break-word",
                          }}
                        />
                      </ListItemButton>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontStyle: "italic" }}
                    >
                      No related links available
                    </Typography>
                  </Grid>
                )}
              </Grid>

              {/* Image Gallery Section */}
              {tech.images && tech.images.length > 0 && (
                <Paper
                  elevation={1}
                  sx={{
                    mt: 3,
                    p: { xs: 2, sm: 3 },
                    bgcolor: "white",
                    wordBreak: "break-word",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <ImageIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="h5">Gallery</Typography>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  <Grid container spacing={2}>
                    {tech.images.map((image, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <motion.div
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <Box
                            onClick={() => handleOpenGallery(index)}
                            sx={{
                              cursor: "pointer",
                              borderRadius: 1,
                              overflow: "hidden",
                              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                              height: 180,
                              position: "relative",
                              "&:hover::after": {
                                opacity: 1,
                              },
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background:
                                  "linear-gradient(to top, rgba(42, 157, 143, 0.7) 0%, rgba(0,0,0,0) 60%)",
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                              },
                              transition:
                                "transform 0.2s ease, box-shadow 0.2s ease",
                              "&:hover": {
                                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                              },
                            }}
                          >
                            <img
                              src={`${API_BASE_URL}${image.url}`}
                              alt={
                                image.caption ||
                                `${tech.name} image ${index + 1}`
                              }
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />

                            {/* Zoom indicator */}
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 8,
                                right: 8,
                                bgcolor: "rgba(255,255,255,0.9)",
                                borderRadius: "50%",
                                p: 0.75,
                                zIndex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                              }}
                            >
                              <ZoomInIcon
                                sx={{ fontSize: 18, color: "primary.main" }}
                              />
                            </Box>
                          </Box>

                          {/* Caption below the image */}
                          {image.caption && (
                            <Typography
                              variant="body2"
                              sx={{
                                mt: 1,
                                mb: 2,
                                color: "text.primary",
                                fontWeight: 500,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                lineHeight: 1.3,
                              }}
                            >
                              {image.caption}
                            </Typography>
                          )}
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}

              {!isMobile && (
                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      boxShadow: "0 4px 10px rgba(42, 157, 143, 0.25)",
                      "&:hover": {
                        boxShadow: "0 6px 12px rgba(42, 157, 143, 0.3)",
                      },
                    }}
                  >
                    Back to Technologies
                  </Button>
                </Box>
              )}
            </Paper>
          </motion.div>
        </Container>
      </Box>
      <ImageGalleryDialog
        open={openGallery}
        handleClose={handleCloseGallery}
        images={tech?.images || []}
        currentIndex={currentImageIndex}
        handlePrev={handlePrevImage}
        handleNext={handleNextImage}
        baseUrl={API_BASE_URL}
      />
    </ThemeProvider>
  );
}

export default TechDetail;

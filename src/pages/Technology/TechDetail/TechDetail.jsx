"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Typography,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";
import ArticleIcon from "@mui/icons-material/Article";
import GavelIcon from "@mui/icons-material/Gavel";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ImageIcon from "@mui/icons-material/Image";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

import InnovatorsSection from "./InnovatorsSection";
import ImageGalleryDialog from "./ImageGalleryDialog";
import iiitdTheme from "./iiitdTheme";

const API_BASE_URL = "https://otmt.iiitd.edu.in/data";

const PATENT_STATUSES = {
  NOT_FILED: "Not Filed",
  APPLICATION_FILED: "Application Filed",
  UNDER_EXAMINATION: "Under Examination",
  GRANTED: "Granted",
  ABANDONED_LAPSED: "Abandoned/Lapsed",
};

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
      <CircularProgress size={60} sx={{ color: "primary.main", mb: 2 }} />
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Loading technology details...
      </Typography>
    </Box>
  </Container>
);

const SectionPaper = ({ children, sx, ...props }) => (
  <Paper
    elevation={1}
    sx={{
      p: { xs: 2, sm: 3 },
      mb: 3,
      bgcolor: "white",
      position: "relative",
      overflow: "hidden",
      ...sx,
    }}
    {...props}
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
    {children}
  </Paper>
);

const renderList = (items, itemIcon) => {
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
            {itemIcon ? (
              React.cloneElement(itemIcon, {
                sx: { color: "primary.main" },
                fontSize: "small",
              })
            ) : (
              <CheckCircleIcon
                sx={{ color: "primary.main" }}
                fontSize="small"
              />
            )}
          </ListItemIcon>
          <ListItemText
            primary={item}
            primaryTypographyProps={{
              variant: "body2",
              color: "text.primary",
              sx: { wordBreak: "break-word" },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

function TechDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tech, setTech] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobile = useMediaQuery(iiitdTheme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchTechDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/technologies/${id}`);
        if (!res.ok) {
          const errData = await res
            .json()
            .catch(() => ({ message: `Error: ${res.status}` }));
          throw new Error(
            errData.message ||
              `Technology not found or error fetching: ${res.status}`
          );
        }
        const data = await res.json();
        setTech(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching technology:", error);
        setTech(null);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTechDetails();
  }, [id]);

  const handleOpenGallery = useCallback((index) => {
    setCurrentImageIndex(index);
    setOpenGallery(true);
  }, []);

  const handleCloseGallery = useCallback(() => {
    setOpenGallery(false);
  }, []);

  const handlePrevImage = useCallback(() => {
    if (!tech) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? tech.images.length - 1 : prev - 1
    );
  }, [tech]);

  const handleNextImage = useCallback(() => {
    if (!tech) return;
    setCurrentImageIndex((prev) =>
      prev === tech.images.length - 1 ? 0 : prev + 1
    );
  }, [tech]);

  if (loading) {
    return (
      <ThemeProvider theme={iiitdTheme}>
        <LoadingState />
      </ThemeProvider>
    );
  }

  if (error || !tech) {
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
              sx: { wordBreak: "break-word" },
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              {error ? "Error Loading Technology" : "Technology Not Found"}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {error ||
                "The technology you're looking for doesn't exist or has been removed."}
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

  const heroTextStyles = {
    overflowWrap: "break-word",
    wordBreak: "break-word",
    maxWidth: "100%",
    whiteSpace: "normal",
  };

  const showPatentAppDetails =
    tech.patent && tech.patent !== PATENT_STATUSES.NOT_FILED;
  const showPatentGrantDetails =
    tech.patent &&
    [PATENT_STATUSES.GRANTED, PATENT_STATUSES.ABANDONED_LAPSED].includes(
      tech.patent
    );

  return (
    <ThemeProvider theme={iiitdTheme}>
      <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
        <Box className="hero-section" minHeight="20vh">
          <Container maxWidth="lg">
            <Box
              className="hero-content"
              sx={{ maxWidth: "100%", overflow: "hidden" }}
            >
              <Typography
                variant="overline"
                className="service-label"
                sx={{ ...heroTextStyles, mr: 1 }}
              >
                {tech.docket}
              </Typography>
              <Typography
                variant="overline"
                className="service-label"
                sx={heroTextStyles}
              >
                TRL: {tech.trl}
              </Typography>
              <Typography
                variant="h1"
                className="hero-title"
                sx={heroTextStyles}
              >
                {tech.name}
              </Typography>
              <Typography
                variant="body1"
                className="hero-description"
                sx={heroTextStyles}
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
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <SectionPaper>
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
                </SectionPaper>

                <SectionPaper>
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
                </SectionPaper>

                <SectionPaper>
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
                    {tech.overview ||
                      tech.description ||
                      "No overview available"}
                  </Typography>
                </SectionPaper>

                {tech.patent && (
                  <SectionPaper>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <GavelIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h5">Patent Information</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <List dense disablePadding>
                      <ListItem disableGutters sx={{ py: 0.75, px: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <GavelIcon
                            sx={{ color: "primary.main" }}
                            fontSize="small"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="Status"
                          secondary={tech.patent}
                          primaryTypographyProps={{
                            variant: "body2",
                            fontWeight: 500,
                            color: "text.secondary",
                          }}
                          secondaryTypographyProps={{
                            variant: "body1",
                            color: "text.primary",
                            sx: { wordBreak: "break-word" },
                          }}
                        />
                      </ListItem>

                      {showPatentAppDetails && tech.patentApplicationNumber && (
                        <ListItem disableGutters sx={{ py: 0.75, px: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <ConfirmationNumberIcon
                              sx={{ color: "primary.main" }}
                              fontSize="small"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Application Number"
                            secondary={tech.patentApplicationNumber}
                            primaryTypographyProps={{
                              variant: "body2",
                              fontWeight: 500,
                              color: "text.secondary",
                            }}
                            secondaryTypographyProps={{
                              variant: "body1",
                              color: "text.primary",
                              sx: { wordBreak: "break-word" },
                            }}
                          />
                        </ListItem>
                      )}

                      {showPatentAppDetails && tech.patentFilingDate && (
                        <ListItem disableGutters sx={{ py: 0.75, px: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <DateRangeIcon
                              sx={{ color: "primary.main" }}
                              fontSize="small"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Filing Date"
                            secondary={new Date(
                              tech.patentFilingDate
                            ).toLocaleDateString()}
                            primaryTypographyProps={{
                              variant: "body2",
                              fontWeight: 500,
                              color: "text.secondary",
                            }}
                            secondaryTypographyProps={{
                              variant: "body1",
                              color: "text.primary",
                            }}
                          />
                        </ListItem>
                      )}

                      {showPatentGrantDetails && tech.patentId && (
                        <ListItem disableGutters sx={{ py: 0.75, px: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <FingerprintIcon
                              sx={{ color: "primary.main" }}
                              fontSize="small"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Patent ID"
                            secondary={tech.patentId}
                            primaryTypographyProps={{
                              variant: "body2",
                              fontWeight: 500,
                              color: "text.secondary",
                            }}
                            secondaryTypographyProps={{
                              variant: "body1",
                              color: "text.primary",
                              sx: { wordBreak: "break-word" },
                            }}
                          />
                        </ListItem>
                      )}

                      {showPatentGrantDetails && tech.patentGrantDate && (
                        <ListItem disableGutters sx={{ py: 0.75, px: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <DateRangeIcon
                              sx={{ color: "primary.main" }}
                              fontSize="small"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Grant Date"
                            secondary={new Date(
                              tech.patentGrantDate
                            ).toLocaleDateString()}
                            primaryTypographyProps={{
                              variant: "body2",
                              fontWeight: 500,
                              color: "text.secondary",
                            }}
                            secondaryTypographyProps={{
                              variant: "body1",
                              color: "text.primary",
                            }}
                          />
                        </ListItem>
                      )}

                      {showPatentAppDetails && tech.patentDocumentUrl && (
                        <ListItem disableGutters sx={{ py: 0.75, px: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <LinkIcon
                              sx={{ color: "primary.main" }}
                              fontSize="small"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Document"
                            primaryTypographyProps={{
                              variant: "body2",
                              fontWeight: 500,
                              color: "text.secondary",
                            }}
                            secondary={
                              <Button
                                component="a"
                                href={tech.patentDocumentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                startIcon={<LinkIcon />}
                                sx={{
                                  textTransform: "none",
                                  p: 0,
                                  justifyContent: "flex-start",
                                  color: "primary.main",
                                  "&:hover": {
                                    textDecoration: "underline",
                                    bgcolor: "transparent",
                                  },
                                  wordBreak: "break-all",
                                  textAlign: "left",
                                }}
                              >
                                {tech.patentDocumentUrl.length > 40
                                  ? `${tech.patentDocumentUrl.substring(
                                      0,
                                      37
                                    )}...`
                                  : tech.patentDocumentUrl}
                              </Button>
                            }
                            secondaryTypographyProps={{ component: "div" }}
                          />
                        </ListItem>
                      )}
                    </List>
                  </SectionPaper>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    bgcolor: "white",
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
                          sx={{
                            color: "text.primary",
                            wordBreak: "break-word",
                          }}
                        >
                          {tech.docket || "Not specified"}
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
                    {renderList(tech.advantages, <CheckCircleIcon />)}
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

            <Grid container spacing={3} sx={{ mt: 0.5 }}>
              <Grid item xs={12} md={6}>
                <SectionPaper sx={{ mb: { xs: 3, md: 0 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="h5">Applications</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  {renderList(tech.applications, <CheckCircleIcon />)}
                </SectionPaper>
              </Grid>
              <Grid item xs={12} md={6}>
                <SectionPaper sx={{ mb: { xs: 3, md: 0 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="h5">Use Cases</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  {renderList(tech.useCases, <CheckCircleIcon />)}
                </SectionPaper>
              </Grid>
            </Grid>

            {tech.brochures && tech.brochures.length > 0 && (
              <SectionPaper sx={{ mt: 3, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <ArticleIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h5">Brochures & Documents</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List disablePadding>
                  {tech.brochures.map((brochure, index) => (
                    <ListItemButton
                      key={`brochure-${index}-${brochure.url}`}
                      component="a"
                      href={
                        brochure.url.startsWith("http")
                          ? brochure.url
                          : `${API_BASE_URL}${brochure.url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                        mb: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: "rgba(42, 157, 143, 0.05)",
                          transform: "translateY(-1px)",
                          boxShadow: 1,
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <DescriptionIcon sx={{ color: "primary.main" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          brochure.originalName || `Document ${index + 1}`
                        }
                        primaryTypographyProps={{
                          variant: "body1",
                          fontWeight: 500,
                          color: "text.primary",
                          wordBreak: "break-word",
                        }}
                      />
                      <ArrowForwardIcon
                        sx={{ color: "text.secondary", ml: 1 }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </SectionPaper>
            )}

            {tech.relatedLinks && tech.relatedLinks.length > 0 && (
              <SectionPaper sx={{ mt: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LinkIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h5">Related Links</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  {tech.relatedLinks.map((link, index) => (
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
                          height: "100%",
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
                            sx: { wordBreak: "break-word" },
                          }}
                        />
                      </ListItemButton>
                    </Grid>
                  ))}
                </Grid>
              </SectionPaper>
            )}

            {tech.images && tech.images.length > 0 && (
              <SectionPaper sx={{ mt: 3, borderRadius: 2 }}>
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
                            "&:hover::after": { opacity: 1 },
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
                            src={
                              image.url.startsWith("http")
                                ? image.url
                                : `${API_BASE_URL}${image.url}`
                            }
                            alt={
                              image.caption || `${tech.name} image ${index + 1}`
                            }
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
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
              </SectionPaper>
            )}

            {!isMobile && (
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
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

"use client";
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  Grid,
  keyframes,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import { Home, ArrowBack, ErrorOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Modern color palette
const themeColors = {
  primary: "#00B2B2",
  secondary: "#009494",
  accent: "#009494",
  textPrimary: "#111827",
  textSecondary: "#4b5563",
  background: "#ffffff",
  cardBackground: "#f9fafb",
  lightGrey: "#f3f4f6",
  border: "#e5e7eb",
};

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const NotFoundPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        bgcolor: themeColors.background,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        py: { xs: 4, md: 0 },
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: "40%",
          height: "40%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${themeColors.primary}10, transparent 70%)`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          width: "30%",
          height: "30%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${themeColors.secondary}10, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
            <Fade in={true} timeout={1000}>
              <Box
                sx={{
                  textAlign: { xs: "center", md: "left" },
                  mb: { xs: 4, md: 0 },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
                    backgroundClip: "text",
                    color: "transparent",
                    mb: 2,
                    letterSpacing: "-0.05em",
                    lineHeight: 1.1,
                  }}
                >
                  Page not found
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: themeColors.textSecondary,
                    mb: 3,
                    fontWeight: 500,
                    fontSize: { xs: "1.1rem", sm: "1.3rem" },
                    maxWidth: { md: "90%" },
                  }}
                >
                  Sorry, we couldn't find the page you're looking for.
                </Typography>

                <Box sx={{ mb: 4, maxWidth: { md: "90%" } }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: themeColors.textSecondary,
                      mb: 1,
                      lineHeight: 1.7,
                    }}
                  >
                    The page may have been moved, deleted, or the URL might be
                    incorrect.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    justifyContent: { xs: "center", md: "flex-start" },
                    mb: 4,
                  }}
                >
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      startIcon={<Home />}
                      sx={{
                        bgcolor: themeColors.primary,
                        color: "white",
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        boxShadow: `0 4px 14px ${themeColors.primary}30`,
                        "&:hover": {
                          bgcolor: themeColors.primary,
                          boxShadow: `0 6px 20px ${themeColors.primary}40`,
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Back to homepage
                    </Button>
                  </Link>
                </Box>

                
              </Box>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
            <Fade in={true} timeout={1000}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "10rem", sm: "14rem", md: "16rem" },
                    fontWeight: 900,
                    background: `linear-gradient(135deg, ${themeColors.primary}20, ${themeColors.secondary}20)`,
                    color: themeColors.primary,
                    lineHeight: 0.8,
                    animation: `${bounce} 3s ease-in-out infinite`,
                    textAlign: "center",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  404
                </Typography>

                <Box
                  sx={{
                    position: "absolute",
                    width: { xs: "80%", md: "90%" },
                    height: { xs: "80%", md: "90%" },
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${themeColors.accent}10, transparent 70%)`,
                    animation: `${float} 6s ease-in-out infinite`,
                    zIndex: 1,
                  }}
                />
              </Box>
            </Fade>
          </Grid>
        </Grid>

        <Fade in={true} timeout={2000}>
          <Paper
            elevation={0}
            sx={{
              mt: { xs: 2, md: 6 },
              p: 3,
              bgcolor: themeColors.cardBackground,
              borderRadius: 3,
              border: `1px solid ${themeColors.border}`,
              maxWidth: "600px",
              mx: "auto",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ErrorOutline sx={{ color: themeColors.accent }} />
            <Typography
              variant="body2"
              sx={{
                color: themeColors.textSecondary,
                fontSize: "0.9rem",
                lineHeight: 1.6,
              }}
            >
              <strong>Did you know?</strong> The 404 error is one of the most
              recognized HTTP status codes, indicating that the server couldn't
              find the requested resource. It's been part of the web since the
              early HTTP protocol was established in 1991.
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default NotFoundPage;

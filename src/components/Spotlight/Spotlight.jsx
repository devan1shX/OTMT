"use client"
import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Spotlight = ({ tech }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // Color scheme based on research area
  const getColorScheme = (category = "") => {
    const categoryLower = category?.toLowerCase() || "";
    
    if (categoryLower.includes("ai") || categoryLower.includes("intelligence")) {
      return { primary: "#2C7DA0", secondary: "#A9D6E5" };
    } else if (categoryLower.includes("bio")) {
      return { primary: "#2D6A4F", secondary: "#B7E4C7" };
    } else if (categoryLower.includes("math")) {
      return { primary: "#7209B7", secondary: "#DBC2E5" };
    } else if (categoryLower.includes("vision") || categoryLower.includes("computer")) {
      return { primary: "#9D4EDD", secondary: "#E0C3FC" };
    } else if (categoryLower.includes("machine") || categoryLower.includes("learning")) {
      return { primary: "#3A0CA3", secondary: "#BDB2FF" };
    } else {
      return { primary: "#25A2A2", secondary: "#C4F1F1" };
    }
  };

  const colors = getColorScheme(tech.category);
  
  // Map TRL to descriptions
  const getTrlLabel = (trl) => {
    const labels = {
      1: "Basic Principles",
      2: "Technology Concept",
      3: "Proof of Concept",
      4: "Lab Validation",
      5: "Relevant Environment",
      6: "Relevant Demo",
      7: "Operational Demo",
      8: "Complete & Qualified",
      9: "Operational System"
    };
    return labels[trl] || `TRL ${trl}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <Box
        component={Link}
        to={`/tech/${tech.id}`}
        sx={{
          display: "block",
          textDecoration: "none",
          position: "relative",
          height: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          bgcolor: "#FFFFFF",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          "&:hover": {
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)",
            "& .indicator": {
              width: isMobile ? "50%" : "65%",
            },
            "& .trl-detail": {
              opacity: 1,
              transform: "translateY(0)",
            },
            "& .trl-number": {
              opacity: 0,
              transform: "translateY(-20px)",
            },
            "& .arrow-indicator": {
              transform: "translateX(6px)",
            }
          }
        }}
      >
        {/* TRL number display (default view) */}
        <Box
          className="trl-number"
          sx={{
            position: "absolute",
            top: isMobile ? "5px" : "10px",
            right: isMobile ? "5px" : "10px",
            fontSize: isMobile ? "80px" : "120px",
            fontWeight: 800,
            opacity: 0.07,
            color: colors.primary,
            lineHeight: 0.8,
            transform: "translateY(0)",
            transition: "all 0.4s ease",
            zIndex: 0,
            pointerEvents: "none"
          }}
        >
          {tech.trl ? `${tech.trl}` : "TRL"}
        </Box>
        
        {/* TRL detail display (hover view) */}
        {tech.trl && (
          <Box
            className="trl-detail"
            sx={{
              position: "absolute",
              top: isMobile ? "10px" : "15px",
              right: isMobile ? "10px" : "15px",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.4s ease",
              zIndex: 0,
              textAlign: "right",
              pointerEvents: "none"
            }}
          >
            <Typography 
              sx={{ 
                fontSize: isMobile ? "42px" : "64px", 
                fontWeight: 800, 
                color: colors.primary, 
                opacity: 0.2,
                lineHeight: 1 
              }}
            >
              TRL{tech.trl}
            </Typography>
            <Typography 
              sx={{ 
                fontSize: isMobile ? "12px" : "14px", 
                fontWeight: 600, 
                color: colors.primary,
                opacity: 0.6,
                mt: 1
              }}
            >
              {getTrlLabel(tech.trl)}
            </Typography>
          </Box>
        )}

        {/* Main content container */}
        <Box sx={{ 
          position: "relative", 
          zIndex: 1, 
          p: isMobile ? 2 : 3,
          height: "100%" 
        }}>
          {/* Indicator line - positioned to avoid TRL overlap on mobile */}
          <Box
            className="indicator"
            sx={{
              width: "40%",
              height: "3px",
              bgcolor: colors.primary,
              borderRadius: "4px",
              mb: 2.5,
              transition: "width 0.4s ease",
              position: isMobile ? "relative" : "static",
              left: isMobile ? 0 : "auto",
              maxWidth: isMobile ? "100px" : "none"
            }}
          />

          {/* Category label */}
          <Typography
            variant="overline"
            sx={{
              display: "inline-block",
              color: colors.primary,
              fontSize: isMobile ? "0.65rem" : "0.7rem",
              letterSpacing: "0.08em",
              mb: 1,
              fontWeight: 600,
              textTransform: "uppercase"
            }}
          >
            {tech.category || "Research"}
          </Typography>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              color: "#1A202C",
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              lineHeight: 1.3
            }}
          >
            {tech.name}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: "#4A5568",
              mb: 3,
              fontSize: isMobile ? "0.85rem" : "0.9rem",
              lineHeight: 1.6,
              // Less bottom margin on mobile to save space
              mb: isMobile ? 2 : 3
            }}
          >
            {tech.description}
          </Typography>

          {/* Action row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: "auto",
              pt: isMobile ? 0.5 : 1,
              flexWrap: isMobile ? "wrap" : "nowrap",
              gap: isMobile ? 1 : 0
            }}
          >
            {/* Tags section */}
            <Box sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 1,
              // On mobile, give it more space when content wraps
              width: isMobile ? "100%" : "auto"
            }}>
              {/* Keywords (limit to 1 on mobile, 2 on desktop) */}
              {(tech.keywords || ["Research"])
                .slice(0, isMobile ? 1 : 2)
                .map((keyword, idx) => (
                  <Typography
                    key={`kw-${idx}`}
                    variant="caption"
                    sx={{
                      display: "inline-block",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "4px",
                      bgcolor: colors.secondary,
                      color: colors.primary,
                      fontSize: "0.7rem",
                      fontWeight: 500
                    }}
                  >
                    {keyword}
                  </Typography>
                ))
              }
              
              {/* Genre tag (if available and not on mobile) */}
              {tech.genre && !isMobile && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "4px",
                    bgcolor: "#F7FAFC",
                    color: "#4A5568",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    border: "1px solid #EDF2F7"
                  }}
                >
                  {Array.isArray(tech.genre) ? tech.genre[0] : tech.genre}
                </Typography>
              )}
            </Box>

            {/* Explore button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: colors.primary,
                fontWeight: 600,
                fontSize: isMobile ? "0.75rem" : "0.8rem",
                mt: isMobile ? 1 : 0,
                ml: isMobile ? "auto" : 0 // Push to right on mobile
              }}
            >
              Explore
              <Box
                component="span"
                className="arrow-indicator"
                sx={{
                  display: "inline-flex",
                  ml: 0.5,
                  transition: "transform 0.3s ease"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M5 12H19M19 12L12 5M19 12L12 19" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Spotlight;
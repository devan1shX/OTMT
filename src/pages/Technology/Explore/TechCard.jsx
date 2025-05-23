import React from "react";
import {
  Box,
  Chip,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { School } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

const TechCard = ({ tech }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const trlColor = { main: "#10B981", light: "#ECFDF5" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <RouterLink to={`/tech/${tech.id}`} style={{ textDecoration: "none" }}>
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              "& .tech-card-overlay": {
                opacity: 1,
              },
            },
          }}
        >
          <Box
            sx={{
              height: "6px",
              background: "#f0f0f0",
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: tech.trl ? `${100}%` : "0%",
                background: trlColor.main,
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
              }}
            />
          </Box>

          <Box
            sx={{
              p: isMobile ? 2.5 : 3,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  maxWidth: "calc(100% - 70px)",
                  flexWrap: "wrap",
                }}
              >
                {tech.docket && (
                  <Chip
                    label={tech.docket}
                    size="small"
                    sx={{
                      height: "22px",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      bgcolor: "rgba(0,0,0,0.04)",
                      color: "text.secondary",
                      maxWidth: "100%",
                      "& .MuiChip-label": {
                        px: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    }}
                  />
                )}
              </Box>

              <Chip
                label={`TRL ${tech.trl || "N/A"}`}
                size="small"
                sx={{
                  height: "22px",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  bgcolor: "rgba(0,0,0,0.04)",
                  color: "text.secondary",
                  "& .MuiChip-label": { px: 1 },
                  flexShrink: 0,
                }}
              />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 2,
                lineHeight: 1.3,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              {tech.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2.5,
                flexGrow: 1,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                lineHeight: 1.7,
              }}
            >
              {tech.description}
            </Typography>

            {tech.keywords && tech.keywords.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 2.5,
                  maxHeight: "58px",
                  overflow: "hidden",
                }}
              >
                {tech.keywords.slice(0, 5).map((keyword, idx) => (
                  <Chip
                    key={idx}
                    label={keyword}
                    size="small"
                    sx={{
                      height: "24px",
                      fontSize: "0.75rem",
                      bgcolor: "rgba(0,0,0,0.04)",
                      color: "text.primary",
                    }}
                  />
                ))}
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 1.5, md: 2 },
                pt: 2,
                borderTop: "1px solid rgba(0,0,0,0.06)",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {tech.genre && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component={School}
                    sx={{
                      color: trlColor.main,
                      mr: 0.75,
                      fontSize: "1rem",
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100px",
                    }}
                  >
                    {Array.isArray(tech.genre) ? tech.genre[0] : tech.genre}
                  </Typography>
                </Box>
              )}

              {tech.innovators && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component={GroupsIcon}
                    sx={{
                      color: trlColor.main,
                      mr: 0.75,
                      fontSize: "1rem",
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "120px",
                    }}
                  >
                    {Array.isArray(tech.innovators) && tech.innovators.length > 0
                      ? tech.innovators.map((innovator) => innovator.name).join(", ")
                      : typeof tech.innovators === "string"
                      ? tech.innovators
                      : ""}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      </RouterLink>
    </motion.div>
  );
};

export default TechCard;

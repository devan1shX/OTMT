import React from "react";
import { Box, Typography, Divider, Avatar, ListItemAvatar, ListItemText, ListItemButton } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const InnovatorsSection = ({ tech }) => {
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
                  bgcolor: "rgba(42, 157, 143, 0.05)",
                  transform: "translateY(-2px)",
                  boxShadow: 1,
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {innovator.name ? innovator.name[0].toUpperCase() : "?"}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={innovator.name || "Unknown Innovator"}
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

export default InnovatorsSection ;
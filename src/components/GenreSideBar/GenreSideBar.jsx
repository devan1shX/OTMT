import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import aiImg from "../../assets/Tech_Finder_Collections_Images/ArtificalIntelligence.jpg";
import biotechImg from "../../assets/Tech_Finder_Collections_Images/biotech.jpg";
import cybersecurityImg from "../../assets/Tech_Finder_Collections_Images/cybersecurity.jpg";
import cloudcomputingImg from "../../assets/Tech_Finder_Collections_Images/cloudComputing.jpg";
import iotImg from "../../assets/Tech_Finder_Collections_Images/IOT.jpg";
import "./GenreSideBar.css";

const genreImages = {
  AI: aiImg,
  Biotech: biotechImg,
  IoT: iotImg,
  "Cyber Security": cybersecurityImg,
  "Cloud Computing": cloudcomputingImg,
};

const GenreSidebar = ({ handleGenreChange }) => {
  const [hoveredGenre, setHoveredGenre] = useState(null);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 2,
      }}
    >
      {Object.keys(genreImages).map((genre) => (
        <Box
          key={genre}
          onClick={() => handleGenreChange(genre)}
          onMouseEnter={() => setHoveredGenre(genre)}
          onMouseLeave={() => setHoveredGenre(null)}
          sx={{
            cursor: "pointer",
            height: "280px",
            borderRadius: "1px",
            position: "relative",
            overflow: "hidden",
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            color: "white",
            textAlign: "left",
            gap: "10px",

            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${genreImages[genre]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 0.3s ease-in-out",
              zIndex: 0,
              willChange: "transform",
            },

            "&:hover::before": {
              transform: "scale(1.2)",
            },

            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(7, 0, 0, 0.8), #328D89)",
              zIndex: 1,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, zIndex: 2 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
                transition: "text-decoration 0.3s ease",
                textDecoration: hoveredGenre === genre ? "underline" : "none",
              }}
            >
              {genre}
            </Typography>
            <ArrowForwardIos
              sx={{
                fontSize: "24px",
                transition: "opacity 0.3s ease",
                opacity: hoveredGenre === genre ? 1 : 0,
              }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              zIndex: 2,
              maxWidth: "90%",
              opacity: 0.9,
            }}
          >
            Explore the latest innovations, trends, and breakthroughs in {genre}.
            Stay informed about the future of this evolving field.
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default GenreSidebar;

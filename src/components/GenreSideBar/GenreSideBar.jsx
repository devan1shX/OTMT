import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import aiImg from "../../assets/Tech_Finder_Collections_Images/ArtificalIntelligence.jpg";
import biotechImg from "../../assets/Tech_Finder_Collections_Images/biotech.jpg";
import cybersecurityImg from "../../assets/Tech_Finder_Collections_Images/cybersecurity.jpg";
import cloudcomputingImg from "../../assets/Tech_Finder_Collections_Images/cloudComputing.jpg";
import iotImg from "../../assets/Tech_Finder_Collections_Images/IOT.jpg";

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
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 3,
        mb: 5,
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
            height: "300px",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "24px",
            color: "#fff",
            boxShadow: 3,
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: 6,
            },

            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${genreImages[genre]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transformOrigin: "center",
              transition: "transform 0.4s ease",
              zIndex: 0,
            },

            "&:hover::before": {
              transform: "scale(1.1)",
            },

            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3))",
              zIndex: 1,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              zIndex: 2,
              transition: "transform 0.3s ease",
              transform: hoveredGenre === genre ? "translateX(4px)" : "none",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
                textDecoration: hoveredGenre === genre ? "underline" : "none",
              }}
            >
              {genre}
            </Typography>
            <ArrowForwardIos
              sx={{
                fontSize: "20px",
                opacity: hoveredGenre === genre ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
          </Box>

          <Typography
            variant="body2"
            sx={{
              zIndex: 2,
              opacity: 0.85,
              maxWidth: "90%",
              mt: 1,
              fontSize: "0.95rem",
              lineHeight: 1.4,
            }}
          >
            Discover innovations and breakthroughs in {genre}. Stay updated with emerging tech shaping the future.
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default GenreSidebar;

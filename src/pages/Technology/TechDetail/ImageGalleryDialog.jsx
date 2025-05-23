import React from "react";
import {
  Dialog,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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

export default ImageGalleryDialog;

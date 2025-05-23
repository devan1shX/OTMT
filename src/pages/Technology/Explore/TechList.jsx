// TechList.js
import React, { useMemo } from "react";
import {
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import TechCard from "./TechCard"; // adjust path as needed

const TechList = ({
  technologies,
  search,
  page,
  rowsPerPage,
  selectedGenres,
  filterTRL,
  selectedPatentStatuses, // <-- Destructure the new prop
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredTechs = useMemo(() => {
    const searchTerm = search ? search.toLowerCase().trim() : ""; // Ensure search is defined and trim
    const activeTRL = filterTRL ? Number(filterTRL) : null;

    // Early exit if no filters are applied and technologies is available
    if (
      !searchTerm &&
      (!selectedGenres || selectedGenres.length === 0) &&
      !activeTRL &&
      (!selectedPatentStatuses || selectedPatentStatuses.length === 0) // <-- Include patent status in early exit
    ) {
      return technologies || []; // Return empty array if technologies is null/undefined
    }

    if (!Array.isArray(technologies)) {
        return []; // Return empty array if technologies is not an array
    }

    return technologies.filter((tech) => {
      // Ensure tech object is valid
      if (!tech || typeof tech !== 'object') return false;

      // Search filter (name or innovators)
      const nameMatch = tech.name && typeof tech.name === 'string' 
        ? tech.name.toLowerCase().includes(searchTerm) 
        : false;

      let innovatorMatch = false;
      if (tech.innovators) {
        if (Array.isArray(tech.innovators)) {
          innovatorMatch = tech.innovators.some((innovator) =>
            innovator && innovator.name && typeof innovator.name === 'string'
            ? innovator.name.toLowerCase().includes(searchTerm)
            : false
          );
        } else if (typeof tech.innovators === "string") {
          innovatorMatch = tech.innovators.toLowerCase().includes(searchTerm);
        }
      }
      const searchPass = !searchTerm || nameMatch || innovatorMatch;

      // TRL filter
      const trlPass = !activeTRL || (tech.trl && Number(tech.trl) === activeTRL);
      
      // Genre filter
      const genrePass =
        (!selectedGenres || selectedGenres.length === 0) ||
        (tech.genre &&
          (Array.isArray(tech.genre)
            ? tech.genre.some((g) => selectedGenres.includes(g))
            : selectedGenres.includes(tech.genre))
        );

      // Patent Status filter (NEW)
      const patentStatusPass =
        (!selectedPatentStatuses || selectedPatentStatuses.length === 0) ||
        (tech.patent && selectedPatentStatuses.includes(tech.patent));

      return searchPass && trlPass && genrePass && patentStatusPass;
    });
  }, [technologies, search, selectedGenres, filterTRL, selectedPatentStatuses]); // <-- Add selectedPatentStatuses to dependency array

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedTechs = filteredTechs.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page + search + selectedGenres.join(',') + filterTRL + (selectedPatentStatuses ? selectedPatentStatuses.join(',') : '')} // More robust key for re-animation on filter change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Stack spacing={3}>
          {paginatedTechs.map((tech) => (
            // Ensure tech and tech.id are valid before rendering TechCard
            tech && tech.id ? (
              <LazyLoadComponent key={tech.id}>
                <TechCard tech={tech} />
              </LazyLoadComponent>
            ) : null
          ))}
        </Stack>

        {paginatedTechs.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              No technologies found matching your criteria.
            </Typography>
          </Box>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default TechList;
import React, { useState, Suspense, useEffect, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Container,
  CircularProgress,
  Card,
  CardContent,
  Breadcrumbs,
  Link as MuiLink,
  Pagination,
  Box,
  Grid,
  Stack,
  Paper,
  InputAdornment,
  IconButton,
  Collapse,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Search, FilterList, LocationOn, School } from "@mui/icons-material";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import FilterSidebar from "../../../components/LeftSideBar/FilterSidebar";
import GenreSidebar from "../../../components/GenreSideBar/GenreSideBar";
import Spotlight from "../../../components/Spotlight/Spotlight";

// Define theme colors based on the provided image
const themeColors = {
  primary: "#328D89",
  secondary: "#856ACF",
  textPrimary: "#1E4249",
  textSecondary: "#555555",
  background: "#FFFFFF",
  cardBackground: "#F8F9FA",
  lightGrey: "#EEEEEE",
  border: "#DDDDDD",
};

const TechCard = ({ tech }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Always use production-ready color
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
          {/* Decorative top bar with progress indicator */}
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
                width: "100%",
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
            {/* Top section with docket and TRL chip */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 1, maxWidth: "100%" }}>
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
                label={`TRL ${tech.trl}`}
                size="small"
                sx={{
                  height: "22px",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  bgcolor: "rgba(0,0,0,0.04)",
                  color: "text.secondary",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            </Box>
            
            {/* Title */}
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
            
            {/* Description with clamp for consistent card height */}
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
            
            {/* Tags section */}
            {tech.keywords && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 2.5,
                }}
              >
                {tech.keywords.slice(0, 3).map((keyword, idx) => (
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
            
            {/* Info footer */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 1.5, md: 2 },
                pt: 2,
                borderTop: "1px solid rgba(0,0,0,0.06)",
                justifyContent: "space-between",
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
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
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
    <Typography variant="caption" sx={{ fontWeight: 500 }}>
      {Array.isArray(tech.innovators) && tech.innovators.length > 0
        ? tech.innovators.map(innovator => innovator.name).join(", ")
        : typeof tech.innovators === 'string' 
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



const TechList = ({
  technologies,
  search,
  page,
  rowsPerPage,
  selectedGenres,
  filterTRL,
  filterInnovators,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredTechs = useMemo(() => {
    // Inside TechList component, within the useMemo callback
return technologies.filter((tech) => {
  const matchesSearch = tech.name.toLowerCase().includes(search.toLowerCase());
  const matchesTRL =
    filterTRL === "" ||
    (tech.trl && Number(tech.trl) === Number(filterTRL));
    
  // Updated innovators filter to handle array of objects
  const matchesInnovators =
    filterInnovators === "" ||
    (tech.innovators &&
      (Array.isArray(tech.innovators)
        ? tech.innovators.some(innovator => 
            innovator.name.toLowerCase().includes(filterInnovators.toLowerCase()))
        : typeof tech.innovators === 'string' && 
          tech.innovators.name.toLowerCase().includes(filterInnovators.toLowerCase())
      ));
      
  const matchesSelectedGenres =
    selectedGenres.length === 0 || selectedGenres.includes(tech.genre);

  return matchesSearch && matchesTRL && matchesInnovators && matchesSelectedGenres;
});
  }, [technologies, search, selectedGenres, filterTRL, filterInnovators]);

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedTechs = filteredTechs.slice(startIndex, startIndex + rowsPerPage);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Stack spacing={3}>
          {paginatedTechs.map((tech) => (
            <LazyLoadComponent key={tech.id}>
              <TechCard tech={tech} />
            </LazyLoadComponent>
          ))}
        </Stack>

        {paginatedTechs.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              No technologies found matching your criteria
            </Typography>
          </Box>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default function ExploreTechnologiesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  // State for technology data coming from the API.
  const [technologies, setTechnologies] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Initialize state from URL query parameters or localStorage.
  const queryParams = new URLSearchParams(location.search);
  const initialSearch =
    queryParams.get("search") || localStorage.getItem("techSearch") || "";
  const initialPage =
    Number(queryParams.get("page")) ||
    Number(localStorage.getItem("techPage")) ||
    1;
  const initialSelectedGenres = localStorage.getItem("techSelectedGenres")
    ? JSON.parse(localStorage.getItem("techSelectedGenres"))
    : [];

  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [selectedGenres, setSelectedGenres] = useState(initialSelectedGenres);
  const [filterTRL, setFilterTRL] = useState("");
  const [filterInnovators, setFilterInnovators] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const rowsPerPage = 8;

  useEffect(() => {
    fetch("http://localhost:4000/technologies")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setTechnologies(data);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error("Error fetching technologies:", error);
        setLoadingData(false);
      });
  }, []);

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleTRLChange = (e) => {
    const value = e.target.value;
    // Only allow empty or 1-9
    if (value === "" || /^[1-9]$/.test(value)) {
      setFilterTRL(value);
      setPage(1);
    }
  };

  const handleInnovatorsChange = (e) => {
    setFilterInnovators(e.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredCount = technologies.filter((tech) => {
    const matchesSearch = tech.name.toLowerCase().includes(search.toLowerCase());
    const matchesTRL =
      filterTRL === "" ||
      (tech.trl && Number(tech.trl) === Number(filterTRL));
      
    // Fixed innovators filter to handle array of objects
    const matchesInnovators =
      filterInnovators === "" ||
      (tech.innovators &&
        (Array.isArray(tech.innovators)
          ? tech.innovators.some(innovator => 
              innovator.name.toLowerCase().includes(filterInnovators.toLowerCase()))
          : typeof tech.innovators === 'string' 
            ? tech.innovators.toLowerCase().includes(filterInnovators.toLowerCase())
            : false
        ));
        
    const matchesSelectedGenres =
      selectedGenres.length === 0 || selectedGenres.includes(tech.genre);
  
    return matchesSearch && matchesTRL && matchesInnovators && matchesSelectedGenres;
  }).length;

  const pageCount = Math.ceil(filteredCount / rowsPerPage);
  const showTechList = search.trim() !== "" || selectedGenres.length > 0;

  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim() !== "") params.set("search", search);
    params.set("page", page);

    localStorage.setItem("techSearch", search);
    localStorage.setItem("techPage", page);
    localStorage.setItem("techSelectedGenres", JSON.stringify(selectedGenres));

    navigate(`?${params.toString()}`, { replace: true });
  }, [search, page, selectedGenres, navigate]);

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [navigationType]);

  return (
    <Box sx={{ bgcolor: themeColors.background, minHeight: "100vh", wordBreak: "break-word" }}>
      {/* Top AppBar */}
      

      {/* Hero Section */}
            <Box className="hero-section" minHeight='20vh'>
              <Container maxWidth="lg">
                <Box className="hero-content">
                  <Typography variant="overline" className="service-label">
                    Technologies AT IIITD
                  </Typography>
                  <Typography variant="h1" className="hero-title">
                    Explore Technologies
                  </Typography>
                  <Typography variant="body1" className="hero-description">
                    Discover innovative technologies developed by our researchers and partners, driving forward new advancements and breakthroughs in various fields.                  </Typography>
                </Box>
              </Container>
            </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 0, md: 0 }, wordBreak: "break-word" }}>
        {/* Search Bar with Advanced Filters */}
        <Box my={3}>
          <Box mb={1}>
            <Paper
              component="form"
              sx={{
                p: "4px 8px",
                display: "flex",
                alignItems: "center",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                border: `1px solid ${themeColors.border}`,
                transition: "border-color 0.2s, box-shadow 0.2s",
                "&:hover": {
                  borderColor: themeColors.primary,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                },
                minHeight: 50,
              }}
            >
              <InputAdornment sx={{ pl: 1 }}>
                <Search sx={{ color: "lightgray",
                }} />
              </InputAdornment>
              <TextField
                placeholder="Search technologies..."
                variant="standard"
                fullWidth
                value={search}
                onChange={handleSearchChange}
                InputProps={{
                  disableUnderline: true,
                  sx: { ml: 1 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowFilters((prev) => !prev)}
                        sx={{
                          color: showFilters ? themeColors.primary : "inherit",
                          bgcolor: showFilters ? `${themeColors.primary}10` : "transparent",
                        }}
                      >
                        <FilterList />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
          </Box>
          <Collapse in={showFilters} timeout="auto" unmountOnExit>
            <Paper
              sx={{
                p: 2.5,
                mb: 3,
                borderRadius: 2,
                border: `1px solid ${themeColors.border}`,
                mt: 1,
                bgcolor: themeColors.cardBackground,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Filter by TRL Level (1-9)"
                    variant="outlined"
                    size="small"
                    type="number"
                    inputProps={{ min: 1, max: 9 }}
                    value={filterTRL}
                    onChange={handleTRLChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: themeColors.primary,
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: themeColors.primary,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Filter by Innovators"
                    variant="outlined"
                    size="small"
                    value={filterInnovators}
                    onChange={handleInnovatorsChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: themeColors.primary,
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: themeColors.primary,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </Box>

        <Grid container spacing={3}>
          {/* Filter sidebar only if we have search text (and not in mobile layout) */}
          {search.trim() !== "" && !isMedium && (
            <Grid item xs={12} md={3}>
              <FilterSidebar
                selectedGenres={selectedGenres}
                handleGenreChange={handleGenreChange}
              />
            </Grid>
          )}

          <Grid
            item
            xs={12}
            md={search.trim() !== "" ? (isMedium ? 12 : 6) : (isMedium ? 12 : 9)}
          >
            <Suspense
              fallback={
                <Box display="flex" justifyContent="center" my={8}>
                  <CircularProgress sx={{ color: themeColors.primary }} />
                </Box>
              }
            >
              {loadingData ? (
                <Box display="flex" justifyContent="center" my={8}>
                  <CircularProgress sx={{ color: themeColors.primary }} />
                </Box>
              ) : showTechList ? (
                <TechList
                  technologies={technologies}
                  search={search}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selectedGenres={selectedGenres}
                  filterTRL={filterTRL}
                  filterInnovators={filterInnovators}
                />
              ) : (
                <Box>
                  <Stack spacing={3}>
                    {technologies.filter(tech => tech.spotlight).map((tech, index) => (
                      <Spotlight key={index} tech={tech} />
                    ))}
                  </Stack>
                </Box>
              )}
            </Suspense>

            {showTechList && filteredCount > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    "& .MuiPaginationItem-root": { color: themeColors.textPrimary },
                    "& .MuiPaginationItem-page.Mui-selected": {
                      backgroundColor: themeColors.primary,
                      color: "white",
                    },
                  }}
                />
              </Box>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: isMedium ? "block" : "none", md: "block" } }}
          >
            <GenreSidebar
              selectedGenres={selectedGenres}
              handleGenreChange={handleGenreChange}
            />
          </Grid>
        </Grid>
      </Container>

    </Box>
  );
}

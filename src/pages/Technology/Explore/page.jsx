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
import { Search, FilterList, LocationOn, School, Apps as ViewAllIcon } from "@mui/icons-material";
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
                width: tech.trl ? `${100}%` : "0%", // Dynamic width based on TRL
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
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 1, maxWidth: "calc(100% - 70px)", flexWrap: "wrap" }}>
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
                label={`TRL ${tech.trl || 'N/A'}`}
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
                  maxHeight: '58px', 
                  overflow: 'hidden',
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
                  <Typography variant="caption" sx={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}> 
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
                  <Typography variant="caption" sx={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}> 
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
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredTechs = useMemo(() => {
    const searchTerm = search.toLowerCase();
    // If search, selectedGenres, and filterTRL are all empty, it means we want to show all technologies
    // This is typically when "View All Technologies" button has cleared filters.
    if (searchTerm === "" && selectedGenres.length === 0 && filterTRL === "") {
        return technologies;
    }

    return technologies.filter((tech) => {
      const nameMatch = tech.name.toLowerCase().includes(searchTerm);
      let innovatorMatch = false;
      if (tech.innovators) {
        if (Array.isArray(tech.innovators)) {
          innovatorMatch = tech.innovators.some(innovator => 
            innovator.name && innovator.name.toLowerCase().includes(searchTerm)
          );
        } else if (typeof tech.innovators === 'string') {
          innovatorMatch = tech.innovators.toLowerCase().includes(searchTerm);
        }
      }
      
      const matchesSearchCriteria = searchTerm === "" || nameMatch || innovatorMatch;

      const matchesTRL =
        filterTRL === "" ||
        (tech.trl && Number(tech.trl) === Number(filterTRL));
        
      const matchesSelectedGenres =
        selectedGenres.length === 0 || 
        (Array.isArray(tech.genre) 
          ? tech.genre.some(g => selectedGenres.includes(g)) 
          : selectedGenres.includes(tech.genre));

      if (searchTerm !== "") { // If there's a search term, it must be part of the match
        return (nameMatch || innovatorMatch) && matchesTRL && matchesSelectedGenres;
      } else { // If no search term, only TRL and Genre filters apply
        return matchesTRL && matchesSelectedGenres;
      }
    });
  }, [technologies, search, selectedGenres, filterTRL]);

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

  const [technologies, setTechnologies] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  
  const initialSearch = queryParams.get("search") || localStorage.getItem("techSearch") || "";
  const initialPage = Number(queryParams.get("page")) || Number(localStorage.getItem("techPage")) || 1;
  const initialSelectedGenres = JSON.parse(localStorage.getItem("techSelectedGenres")) || [];
  const initialFilterTRL = localStorage.getItem("techFilterTRL") || "";

  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [selectedGenres, setSelectedGenres] = useState(initialSelectedGenres);
  const [filterTRL, setFilterTRL] = useState(initialFilterTRL);
  const [showFilters, setShowFilters] = useState(false);
  const [viewAllTriggered, setViewAllTriggered] = useState(false); // This state controls the "View All" toggle
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

  useEffect(() => {
    return () => {
      localStorage.removeItem("techSearch");
      localStorage.removeItem("techPage");
      localStorage.removeItem("techSelectedGenres");
      localStorage.removeItem("techFilterTRL");
    };
  }, []);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevSelectedGenres) => {
      const newSelectedGenres = prevSelectedGenres.includes(genre)
        ? prevSelectedGenres.filter((g) => g !== genre)
        : [...prevSelectedGenres, genre];
      return newSelectedGenres;
    });
    setPage(1);
    setViewAllTriggered(false); // Applying a filter, so not in "view all by button" mode
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setViewAllTriggered(false); // Applying a filter
  };

  const handleTRLChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[1-9]$/.test(value)) {
      setFilterTRL(value);
      setPage(1);
      setViewAllTriggered(false); // Applying a filter
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    // If viewAllTriggered was true, paginating should keep showing all techs.
    // If filters were active, paginating keeps showing filtered techs.
    // So, no change to viewAllTriggered here.
  };

  const handleViewAll = () => {
    // Clear all filters first
    setSearch("");
    setPage(1); // Reset to first page
    setSelectedGenres([]);
    setFilterTRL("");
    setShowFilters(false); // Close advanced filter panel

    // Toggle the viewAllTriggered state
    // If it's true (already showing all list), set to false (to show spotlight)
    // If it's false (showing spotlight or filtered list), set to true (to show all list)
    setViewAllTriggered(prev => !prev);
  };

  const filteredTechsForCount = useMemo(() => { 
    const searchTerm = search.toLowerCase();

    // If viewAllTriggered is true AND all actual filters are empty, count all technologies
    if (viewAllTriggered && searchTerm === "" && selectedGenres.length === 0 && filterTRL === "") {
        return technologies; 
    }

    // Otherwise, apply filters as usual
    return technologies.filter((tech) => {
      const nameMatch = tech.name.toLowerCase().includes(searchTerm);
      let innovatorMatch = false;
      if (tech.innovators) {
        if (Array.isArray(tech.innovators)) {
          innovatorMatch = tech.innovators.some(innovator => 
            innovator.name && innovator.name.toLowerCase().includes(searchTerm)
          );
        } else if (typeof tech.innovators === 'string') {
          innovatorMatch = tech.innovators.toLowerCase().includes(searchTerm);
        }
      }
      
      const matchesSearchCriteria = searchTerm === "" || nameMatch || innovatorMatch;

      const matchesTRL =
        filterTRL === "" ||
        (tech.trl && Number(tech.trl) === Number(filterTRL));
        
      const matchesSelectedGenres =
        selectedGenres.length === 0 || 
        (Array.isArray(tech.genre) 
          ? tech.genre.some(g => selectedGenres.includes(g)) 
          : selectedGenres.includes(tech.genre));
      
      if (searchTerm !== "") {
        return (nameMatch || innovatorMatch) && matchesTRL && matchesSelectedGenres;
      } else { 
        return matchesTRL && matchesSelectedGenres;
      }
    });
  }, [technologies, search, filterTRL, selectedGenres, viewAllTriggered]);

  const filteredCount = filteredTechsForCount.length;
  const pageCount = Math.ceil(filteredCount / rowsPerPage);

  // Determine if any actual filters (search, genre, TRL) are active
  const filtersAreActive = search.trim() !== "" || selectedGenres.length > 0 || filterTRL !== "";
  // Display TechList if actual filters are active OR if "View All" button has triggered the "all list" mode
  const displayTechList = filtersAreActive || viewAllTriggered; 

  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim() !== "") params.set("search", search);
    if (page !== 1 ) params.set("page", page.toString());

    localStorage.setItem("techSearch", search);
    localStorage.setItem("techPage", page.toString());
    localStorage.setItem("techSelectedGenres", JSON.stringify(selectedGenres));
    localStorage.setItem("techFilterTRL", filterTRL);
    
    navigate(`?${params.toString()}`, { replace: true });

  }, [search, page, selectedGenres, filterTRL, navigate]);

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, navigationType]); 

  return (
    <Box sx={{ bgcolor: themeColors.background, minHeight: "100vh", wordBreak: "break-word" }}>
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
              Discover innovative technologies developed by our researchers and partners, driving forward new advancements and breakthroughs in various fields.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 0, md: 0 }, wordBreak: "break-word" }}>
        <Box my={3}>
          <Box mb={1}>
            <Paper
              component="form"
              onSubmit={(e) => e.preventDefault()} 
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
                <Search sx={{ color: "lightgray" }} />
              </InputAdornment>
              <TextField
                placeholder="Search by name or innovator..." 
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
                          mr: 0.5, 
                        }}
                      >
                        <FilterList />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
             <Box mt={1} display="flex" justifyContent="flex-end">
                <Button
                    onClick={handleViewAll} 
                    size="small"
                    startIcon={<ViewAllIcon />} 
                    sx={{
                    color: themeColors.textSecondary,
                    borderColor: themeColors.border,
                    '&:hover': {
                        backgroundColor: `${themeColors.primary}10`,
                        borderColor: themeColors.primary,
                        color: themeColors.primary,
                    },
                    textTransform: 'none',
                    fontWeight: 500,
                    }}
                >
                    View All Technologies 
                </Button>
            </Box>
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
                <Grid item xs={12}> {/* TRL filter now takes full width */}
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
              </Grid>
            </Paper>
          </Collapse>
        </Box>

        <Grid container spacing={isMedium ? 2 : 3}>
          {/* Sidebars visibility depends on whether the tech list is being displayed */}
          {(displayTechList) && !isMedium && ( 
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
            md={(displayTechList) ? (isMedium ? 12 : 6) : (isMedium ? 12 : 9)} 
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
              ) : displayTechList ? ( 
                <TechList
                  technologies={technologies}
                  search={search}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selectedGenres={selectedGenres}
                  filterTRL={filterTRL}
                />
              ) : ( // Display Spotlight if not displaying tech list
                <Box>
                   <Typography variant="h5" sx={{ mb: 2, color: themeColors.textPrimary, fontWeight:600 }}>Spotlight Technologies</Typography>
                  <Stack spacing={3}>
                    {technologies.filter(tech => tech.spotlight).length > 0 ? (
                        technologies.filter(tech => tech.spotlight).map((tech, index) => (
                            <Spotlight key={index} tech={tech} />
                        ))
                    ) : (
                        <Typography sx={{textAlign: 'center', color: themeColors.textSecondary, mt: 3}}>
                            No spotlight technologies available at the moment.
                        </Typography>
                    )}
                  </Stack>
                </Box>
              )}
            </Suspense>

            {/* Pagination is shown only when the tech list is displayed and there's content to paginate */}
            {displayTechList && filteredCount > 0 && ( 
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
                    "& .MuiPaginationItem-page.Mui-selected:hover": {
                       backgroundColor: themeColors.primary, 
                    }
                  }}
                />
              </Box>
            )}
          </Grid>

          {/* Genre Sidebar visibility */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: (isMedium && (displayTechList)) ? "block" : "none", md: "block" } }} 
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
"use client";

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
import {
  Search,
  FilterList,
  LocationOn,
  School,
  Apps as ViewAllIcon,
} from "@mui/icons-material";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadComponent } from "react-lazy-load-image-component";

import FilterSidebar from "../../../components/LeftSideBar/FilterSidebar";
import PatentFilterSidebar from "../../../components/PatentFilterBar/PatentFilterSidebar";
import GenreSidebar from "../../../components/GenreSideBar/GenreSideBar";
import Spotlight from "../../../components/Spotlight/Spotlight";
import TechList from "./TechList";

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

const PATENT_FILTER_OPTIONS = [
  "Not Filed",
  "Application Filed",
  "Under Examination",
  "Granted",
  "Abandoned/Lapsed",
];

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

  const initialSearch =
    queryParams.get("search") || localStorage.getItem("techSearch") || "";
  const initialPage =
    Number(queryParams.get("page")) ||
    Number(localStorage.getItem("techPage")) ||
    1;
  const initialSelectedGenres =
    JSON.parse(localStorage.getItem("techSelectedGenres")) || [];
  const initialFilterTRL = localStorage.getItem("techFilterTRL") || "";
  const initialSelectedPatentStatuses =
    JSON.parse(localStorage.getItem("techSelectedPatentStatuses")) || [];

  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [selectedGenres, setSelectedGenres] = useState(initialSelectedGenres);
  const [filterTRL, setFilterTRL] = useState(initialFilterTRL);
  const [selectedPatentStatuses, setSelectedPatentStatuses] = useState(
    initialSelectedPatentStatuses
  );
  const [showFilters, setShowFilters] = useState(false);
  const [viewAllTriggered, setViewAllTriggered] = useState(false);
  const rowsPerPage = 8;

  useEffect(() => {
    fetch("https://otmt.iiitd.edu.in/data/technologies")
      .then((res) => res.json())
      .then((data) => {
        setTechnologies(Array.isArray(data) ? data : []);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error("Error fetching technologies:", error);
        setTechnologies([]);
        setLoadingData(false);
      });
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem("techSearch");
      localStorage.removeItem("techPage");
      localStorage.removeItem("techSelectedGenres");
      localStorage.removeItem("techFilterTRL");
      localStorage.removeItem("techSelectedPatentStatuses");
    };
  }, []);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    setPage(1);
    setViewAllTriggered(false);
  };

  const handlePatentStatusChange = (status) => {
    setSelectedPatentStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    setPage(1);
    setViewAllTriggered(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setViewAllTriggered(false);
  };

  const handleTRLChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[1-9]$/.test(value)) {
      setFilterTRL(value);
      setPage(1);
      setViewAllTriggered(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleViewAll = () => {
    setSearch("");
    setPage(1);
    setSelectedGenres([]);
    setFilterTRL("");
    setSelectedPatentStatuses([]);
    setShowFilters(false);
    setViewAllTriggered((prev) => !prev);
  };

  const filteredTechsForCount = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    if (
      !searchTerm &&
      !selectedGenres.length &&
      !filterTRL &&
      !selectedPatentStatuses.length
    ) {
      return viewAllTriggered
        ? technologies
        : technologies.filter((tech) => tech?.spotlight);
    }

    return technologies.filter((tech) => {
      const nameMatch = tech?.name?.toLowerCase().includes(searchTerm) ?? false;

      const innovatorMatch = Array.isArray(tech?.innovators)
        ? tech.innovators.some((innovator) =>
            innovator?.name?.toLowerCase().includes(searchTerm)
          )
        : typeof tech?.innovators === "string" &&
          tech.innovators.toLowerCase().includes(searchTerm);

      const searchPass = !searchTerm || nameMatch || innovatorMatch;
      const trlPass = !filterTRL || Number(tech?.trl) === Number(filterTRL);
      const genrePass =
        selectedGenres.length === 0 ||
        (Array.isArray(tech?.genre)
          ? tech.genre.some((g) => selectedGenres.includes(g))
          : selectedGenres.includes(tech?.genre));
      const patentStatusPass =
        selectedPatentStatuses.length === 0 ||
        selectedPatentStatuses.includes(tech?.patent);

      return searchPass && trlPass && genrePass && patentStatusPass;
    });
  }, [
    technologies,
    search,
    filterTRL,
    selectedGenres,
    selectedPatentStatuses,
    viewAllTriggered,
  ]);

  const filteredCount = filteredTechsForCount.length;
  const pageCount = Math.ceil(filteredCount / rowsPerPage);
  const filtersAreActive =
    search.trim() !== "" ||
    selectedGenres.length > 0 ||
    filterTRL !== "" ||
    selectedPatentStatuses.length > 0;
  const displayTechList = filtersAreActive || viewAllTriggered;

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page > 1) params.set("page", page.toString());

    localStorage.setItem("techSearch", search);
    localStorage.setItem("techPage", page.toString());
    localStorage.setItem("techSelectedGenres", JSON.stringify(selectedGenres));
    localStorage.setItem("techFilterTRL", filterTRL);
    localStorage.setItem(
      "techSelectedPatentStatuses",
      JSON.stringify(selectedPatentStatuses)
    );

    const newQueryString = params.toString();
    if (location.search.substring(1) !== newQueryString) {
      navigate(`?${newQueryString}`, { replace: true });
    }
  }, [
    search,
    page,
    selectedGenres,
    filterTRL,
    selectedPatentStatuses,
    navigate,
    location.search,
  ]);

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, navigationType]);

  return (
    <Box
      sx={{
        bgcolor: themeColors.background,
        minHeight: "100vh",
        wordBreak: "break-word",
        mb: 4,
      }}
    >
      <Box className="hero-section" minHeight="20vh">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="overline" className="service-label">
              Technologies AT IIITD
            </Typography>
            <Typography variant="h1" className="hero-title">
              Explore Technologies
            </Typography>
            <Typography variant="body1" className="hero-description">
              Discover innovative technologies developed by our researchers and
              partners, driving forward new advancements and breakthroughs in
              various fields.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ py: { xs: 0, md: 0 }, wordBreak: "break-word" }}
      >
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
                          bgcolor: showFilters
                            ? `${themeColors.primary}10`
                            : "transparent",
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
                variant="outlined"
                startIcon={<ViewAllIcon />}
                sx={{
                  color: themeColors.textSecondary,
                  borderColor: themeColors.border,
                  "&:hover": {
                    backgroundColor: `${themeColors.primary}10`,
                    borderColor: themeColors.primary,
                    color: themeColors.primary,
                  },
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                {viewAllTriggered && !filtersAreActive
                  ? "Show Spotlight"
                  : "View All Technologies"}
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
                <Grid item xs={12}>
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
          {!isMedium && displayTechList && (
            <Grid item xs={12} md={3}>
              <FilterSidebar
                selectedGenres={selectedGenres}
                handleGenreChange={handleGenreChange}
              />
              <Box mt={2}>
                <PatentFilterSidebar
                  selectedPatentStatuses={selectedPatentStatuses}
                  handlePatentStatusChange={handlePatentStatusChange}
                />
              </Box>
            </Grid>
          )}

          <Grid
            item
            xs={12}
            md={
              displayTechList && !isMedium
                ? 6
                : displayTechList && isMedium
                ? 12
                : !displayTechList && !isMedium
                ? 9
                : 12
            }
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
                  selectedPatentStatuses={selectedPatentStatuses}
                />
              ) : (
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      color: themeColors.textPrimary,
                      fontWeight: 600,
                    }}
                  >
                    Spotlight Technologies
                  </Typography>
                  <Stack spacing={3}>
                    {technologies.filter((tech) => tech?.spotlight).length >
                    0 ? (
                      technologies
                        .filter((tech) => tech?.spotlight)
                        .map((tech, index) => (
                          <Spotlight key={tech?.id || index} tech={tech} />
                        ))
                    ) : (
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: themeColors.textSecondary,
                          mt: 3,
                        }}
                      >
                        No spotlight technologies available at the moment.
                      </Typography>
                    )}
                  </Stack>
                </Box>
              )}
            </Suspense>

            {displayTechList && filteredCount > 0 && pageCount > 1 && (
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}
              >
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: themeColors.textPrimary,
                    },
                    "& .MuiPaginationItem-page.Mui-selected": {
                      backgroundColor: themeColors.primary,
                      color: "white",
                    },
                    "& .MuiPaginationItem-page.Mui-selected:hover": {
                      backgroundColor: themeColors.primary,
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
            sx={{
              display: {
                xs: isMedium && displayTechList ? "block" : "none",
                md: "block",
              },
            }}
          >
            <GenreSidebar
              selectedGenres={selectedGenres}
              handleGenreChange={handleGenreChange}
            />
            {isMedium && displayTechList && (
              <Box mt={2}>
                <Typography
                  variant="body2"
                  display="block"
                  textAlign="center"
                  color="textSecondary"
                  sx={{ mb: 1 }}
                >
                  Filters:
                </Typography>
                <FilterSidebar
                  selectedGenres={selectedGenres}
                  handleGenreChange={handleGenreChange}
                />
                <Box mt={2}>
                  <PatentFilterSidebar
                    selectedPatentStatuses={selectedPatentStatuses}
                    handlePatentStatusChange={handlePatentStatusChange}
                  />
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

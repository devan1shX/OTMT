import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  IconButton,
  alpha,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./page.css";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);
  const [showMorePast, setShowMorePast] = useState(false);

  useEffect(() => {
    fetch("https://otmt.iiitd.edu.in/data/events")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(
            a.date || `${a.month} ${a.day}, ${new Date().getFullYear()}`
          );
          const dateB = new Date(
            b.date || `${b.month} ${b.day}, ${new Date().getFullYear()}`
          );

          if (a.isActive && !b.isActive) return -1;
          if (!a.isActive && b.isActive) return 1;

          if (a.isActive && b.isActive) {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        });
        setEvents(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const upcomingEvents = events.filter((event) => event.isActive);
  const pastEvents = events.filter((event) => !event.isActive);

  const upcomingToShow = showMoreUpcoming
    ? upcomingEvents
    : upcomingEvents.slice(0, 3);
  const pastToShow = showMorePast ? pastEvents : pastEvents.slice(0, 3);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events.</div>;

  return (
    <Box className="events-page">
      <Box className="hero-section" minHeight="20vh">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="overline" className="service-label">
              Upcoming Events
            </Typography>
            <Typography
              variant="h1"
              className="hero-title"
              sx={{ overflowWrap: "break-word" }}
            >
              Events &amp; Activities
            </Typography>
            <Typography
              variant="body1"
              className="hero-description"
              sx={{ overflowWrap: "break-word" }}
            >
              Join us for immersive workshops, engaging conferences, and dynamic
              networking events that propel your ideas forward and drive
              innovation. Collaborate with industry experts and ignite your
              creativity in a vibrant community of forward-thinkers.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container className="content-section">
        {upcomingEvents.length > 0 && (
          <Box className="section-container">
            <Typography variant="h2" className="section-title">
              Upcoming Events
            </Typography>
            <Typography variant="subtitle2" className="section-subtitle">
              Register now for our upcoming events and activities
            </Typography>

            <Grid container spacing={3} className="events-grid">
              {upcomingToShow.map((event, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={event._id?.$oid || event.id || `upcoming-${index}`}
                >
                  <Card
                    className="event-card"
                    elevation={3}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "visible",
                      borderRadius: 2,
                      "&:hover": {
                        boxShadow: 8,
                      },
                    }}
                  >
                    <Paper
                      elevation={6}
                      sx={{
                        position: "absolute",
                        top: -15,
                        left: 20,
                        width: 64,
                        height: 64,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#00B2B2",
                        color: "white",
                        borderRadius: 2,
                        zIndex: 1,
                      }}
                    >
                      <Typography 
                        variant="h5" 
                        fontWeight="bold"
                        sx={{ 
                          fontSize: '1.2rem',
                          lineHeight: 1,
                          textAlign: 'center'
                        }}
                      >
                        {event.day}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        fontWeight="medium"
                        sx={{ 
                          fontSize: '0.65rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          textAlign: 'center',
                          mt: 0.25
                        }}
                      >
                        {event.month?.substring(0, 3)}
                      </Typography>
                    </Paper>
                    <CardContent
                      sx={{
                        pt: 4,
                        pb: 2,
                        px: 3,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        className="event-title"
                        sx={{
                          mt: 1,
                          mb: 2,
                          fontWeight: "bold",
                          color: "text.primary",
                          overflowWrap: "break-word",
                        }}
                      >
                        {event.title}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Box
                          className="detail-item"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <LocationOnIcon fontSize="small" color="action" />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ overflowWrap: "break-word" }}
                          >
                            {event.location}
                          </Typography>
                        </Box>
                        <Box
                          className="detail-item"
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AccessTimeIcon fontSize="small" color="action" />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ overflowWrap: "break-word" }}
                          >
                            {event.time}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        className="event-description"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          flexGrow: 1,
                          overflowWrap: "break-word",
                        }}
                      >
                        {event.description}
                      </Typography>

                      <Button
                        variant="contained"
                        color="primary"
                        className="action-button"
                        fullWidth
                        href={event.registration}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderRadius: 2,
                          py: 1,
                          textTransform: "none",
                          fontWeight: "bold",
                          boxShadow: 2,
                          mt: "auto",
                          background: "#00B2B2",
                          "&:hover": {
                            boxShadow: 5,
                            bgcolor: "#009494",
                          },
                        }}
                      >
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {upcomingEvents.length > 3 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Button
                  variant="outlined"
                  onClick={() => setShowMoreUpcoming(!showMoreUpcoming)}
                  endIcon={
                    <ExpandMoreIcon
                      sx={{
                        transform: showMoreUpcoming
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    />
                  }
                  sx={{ textTransform: "none" }}
                >
                  {showMoreUpcoming ? "Show Less" : "Show More"}
                </Button>
              </Box>
            )}
          </Box>
        )}

        {pastEvents.length > 0 && (
          <Box className="section-container" sx={{ mt: 6 }}>
            <Typography variant="h2" className="section-title">
              Past Events
            </Typography>
            <Typography variant="subtitle2" className="section-subtitle">
              Explore our previous events and their outcomes
            </Typography>

            <Grid container spacing={3} className="events-grid">
              {pastToShow.map((event, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={event._id?.$oid || event.id || `past-${index}`}
                >
                  <Card
                    className="event-card past-event-card"
                    elevation={2}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "visible",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      borderRadius: 2,
                      opacity: 0.9,
                      backgroundColor: (theme) =>
                        alpha(theme.palette.background.paper, 0.95),
                      "&:hover": {
                        boxShadow: 5,
                        opacity: 1,
                      },
                    }}
                  >
                    <Paper
                      elevation={4}
                      sx={{
                        position: "absolute",
                        top: -15,
                        left: 20,
                        width: 64,
                        height: 64,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "grey.500",
                        color: "white",
                        borderRadius: 2,
                        zIndex: 1,
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        {event.day}
                      </Typography>
                      <Typography variant="caption" fontWeight="medium">
                        {event.month}
                      </Typography>
                    </Paper>
                    <CardContent
                      sx={{
                        pt: 4,
                        pb: 2,
                        px: 3,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        className="event-title"
                        sx={{
                          mt: 1,
                          mb: 2,
                          fontWeight: "bold",
                          color: "text.secondary",
                          overflowWrap: "break-word",
                        }}
                      >
                        {event.title}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Box
                          className="detail-item"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <LocationOnIcon fontSize="small" color="action" />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ overflowWrap: "break-word" }}
                          >
                            {event.location}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        className="event-description"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          flexGrow: 1,
                          overflowWrap: "break-word",
                        }}
                      >
                        {event.description}
                      </Typography>

                      <Button
                        variant="outlined"
                        color="inherit"
                        className="action-button"
                        fullWidth
                        href={event.registration}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderRadius: 2,
                          py: 1,
                          textTransform: "none",
                          fontWeight: "medium",
                          borderColor: "grey.400",
                          color: "text.secondary",
                          mt: "auto",
                          "&:hover": {
                            borderColor: "grey.600",
                            backgroundColor: alpha("#000000", 0.04),
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {pastEvents.length > 3 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Button
                  variant="outlined"
                  onClick={() => setShowMorePast(!showMorePast)}
                  endIcon={
                    <ExpandMoreIcon
                      sx={{
                        transform: showMorePast
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    />
                  }
                  sx={{ textTransform: "none" }}
                >
                  {showMorePast ? "Show Less" : "Show More"}
                </Button>
              </Box>
            )}
          </Box>
        )}

        {events.length === 0 && !loading && (
          <Box sx={{ textAlign: "center", mt: 6, mb: 6 }}>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              No Events Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please check back later for upcoming events and activities.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default EventsPage;

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
    fetch("http://localhost:4000/events")
      .then((res) => res.json())
      .then((data) => {
        // Sort events: upcoming first by date, then past by date descending
        const sortedData = data.sort((a, b) => {
            // Convert date strings or timestamps to Date objects if needed
            const dateA = new Date(a.date || `${a.month} ${a.day}, ${new Date().getFullYear()}`); // Assuming a way to get full date
            const dateB = new Date(b.date || `${b.month} ${b.day}, ${new Date().getFullYear()}`);

            if (a.isActive && !b.isActive) return -1; // a is upcoming, b is past
            if (!a.isActive && b.isActive) return 1;  // a is past, b is upcoming

            if (a.isActive && b.isActive) {
                return dateA - dateB; // Both upcoming, sort ascending
            } else { // Both past
                return dateB - dateA; // Both past, sort descending
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

  // Separate events using the isActive flag:
  const upcomingEvents = events.filter((event) => event.isActive);
  const pastEvents = events.filter((event) => !event.isActive);

  // Determine events to display (top 3 or all if expanded):
  const upcomingToShow = showMoreUpcoming
    ? upcomingEvents
    : upcomingEvents.slice(0, 3);
  const pastToShow = showMorePast ? pastEvents : pastEvents.slice(0, 3);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events.</div>;

  return (
    <Box className="events-page">
      {/* Top Hero Section */}
      <Box className="hero-section" minHeight="20vh">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="overline" className="service-label">
              Upcoming Events
            </Typography>
            <Typography variant="h1" className="hero-title" sx={{ overflowWrap: 'break-word' }}> {/* Added word wrap */}
              Events &amp; Activities
            </Typography>
            <Typography variant="body1" className="hero-description" sx={{ overflowWrap: 'break-word' }}> {/* Added word wrap */}
              Join us for immersive workshops, engaging conferences, and dynamic
              networking events that propel your ideas forward and drive innovation.
              Collaborate with industry experts and ignite your creativity in a vibrant
              community of forward-thinkers.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Events Section */}
      <Container className="content-section">
        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && ( // Only show section if there are upcoming events
          <Box className="section-container">
            <Typography variant="h2" className="section-title">
              Upcoming Events
            </Typography>
            <Typography variant="subtitle2" className="section-subtitle">
              Register now for our upcoming events and activities
            </Typography>

            <Grid container spacing={3} className="events-grid">
              {upcomingToShow.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event._id?.$oid || event.id}> {/* Handle different ID structures */}
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
                        backgroundColor: "#00B2B2", // Consider using theme.palette.primary.main
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
                        pt: 4, // Adjusted padding top to account for the absolute positioned Paper
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
                          mt: 1, // Margin top relative to CardContent
                          mb: 2,
                          fontWeight: "bold",
                          color: "text.primary",
                          overflowWrap: 'break-word', // Ensure title wraps
                        }}
                      >
                        {event.title}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Box
                          className="detail-item"
                          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                        >
                          <LocationOnIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'break-word' }}> {/* Wrap location */}
                            {event.location}
                          </Typography>
                        </Box>
                        <Box
                          className="detail-item"
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AccessTimeIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'break-word' }}> {/* Wrap time */}
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
                          flexGrow: 1, // Allows description to take available space
                          overflowWrap: 'break-word', // Ensure description wraps
                          // Optional: Add max height and overflow-y if descriptions can be very long
                          // maxHeight: '100px',
                          // overflowY: 'auto',
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
                        target="_blank" // Open link in new tab
                        rel="noopener noreferrer" // Security best practice for target="_blank"
                        sx={{
                          borderRadius: 2,
                          py: 1,
                          textTransform: "none",
                          fontWeight: "bold",
                          boxShadow: 2,
                          mt: "auto", // Pushes button to the bottom
                          background: "#00B2B2", // Consider theme.palette.primary.main
                          "&:hover": {
                            boxShadow: 5,
                            bgcolor: "#009494", // Consider theme.palette.primary.dark
                          },
                        }}
                        // Disable button if registration link is missing or invalid (optional)
                        // disabled={!event.registration}
                      >
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {upcomingEvents.length > 3 && ( // Show button only if there are more than 3 events
              <Box display="flex" justifyContent="center" mt={4}> {/* Increased margin top */}
                <Button
                    variant="outlined"
                    onClick={() => setShowMoreUpcoming(!showMoreUpcoming)}
                    endIcon={<ExpandMoreIcon sx={{ transform: showMoreUpcoming ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />}
                    sx={{ textTransform: 'none' }}
                >
                   {showMoreUpcoming ? "Show Less" : "Show More"}
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* Past Events Section */}
        {pastEvents.length > 0 && ( // Only show section if there are past events
          <Box className="section-container" sx={{mt: 6}}> {/* Add margin top to separate sections */}
            <Typography variant="h2" className="section-title">
              Past Events
            </Typography>
            <Typography variant="subtitle2" className="section-subtitle">
              Explore our previous events and their outcomes
            </Typography>

            <Grid container spacing={3} className="events-grid">
              {pastToShow.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event._id?.$oid || event.id}> {/* Handle different ID structures */}
                  <Card
                    className="event-card past-event-card" // Added specific class for past events
                    elevation={2}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "visible",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      borderRadius: 2,
                      opacity: 0.9, // Slightly faded look
                      backgroundColor: (theme) =>
                        alpha(theme.palette.background.paper, 0.95), // Subtle background difference
                      "&:hover": {
                        boxShadow: 5,
                        opacity: 1, // Full opacity on hover
                      },
                    }}
                  >
                     <Paper
                      elevation={4} // Slightly less elevation than upcoming
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
                        backgroundColor: "grey.500", // Grey color for past events
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
                        pt: 4, // Adjusted padding top
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
                          color: "text.secondary", // Dimmer color for past event titles
                          overflowWrap: 'break-word', // Ensure title wraps
                        }}
                      >
                        {event.title}
                      </Typography>

                      <Box sx={{ mb: 2 }}> {/* Keep location for context */}
                        <Box
                          className="detail-item"
                          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                        >
                          <LocationOnIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'break-word' }}> {/* Wrap location */}
                            {event.location}
                          </Typography>
                        </Box>
                         {/* Optionally hide time for past events or keep it */}
                         {/* <Box
                          className="detail-item"
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AccessTimeIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'break-word' }}>
                            {event.time}
                          </Typography>
                        </Box> */}
                      </Box>

                      <Typography
                        variant="body2"
                        className="event-description"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          flexGrow: 1,
                          overflowWrap: 'break-word', // Ensure description wraps
                          // Optional: Add max height and overflow-y if descriptions can be very long
                          // maxHeight: '100px',
                          // overflowY: 'auto',
                        }}
                      >
                        {event.description}
                      </Typography>
                    
                      <Button
                        variant="outlined" // Outlined style for past events
                        color="inherit" // Use inherit color to be less prominent
                        className="action-button"
                        fullWidth
                        href={event.registration} // Link to details/archive if available
                        target="_blank"
                        rel="noopener noreferrer"
                        // disabled={!event.detailsLink} // Disable if no details link
                        sx={{
                          borderRadius: 2,
                          py: 1,
                          textTransform: "none",
                          fontWeight: "medium",
                          borderColor: 'grey.400', // Match grey theme
                          color: 'text.secondary',
                          mt: "auto", // Pushes button to the bottom
                           "&:hover": {
                                borderColor: 'grey.600',
                                backgroundColor: alpha('#000000', 0.04) // Subtle hover background
                           },
                        }}
                      >
                        View Details {/* Or "View Archive" */}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
             {pastEvents.length > 3 && ( // Show button only if there are more than 3 events
              <Box display="flex" justifyContent="center" mt={4}> {/* Increased margin top */}
                 <Button
                    variant="outlined"
                    onClick={() => setShowMorePast(!showMorePast)}
                    endIcon={<ExpandMoreIcon sx={{ transform: showMorePast ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />}
                    sx={{ textTransform: 'none' }}
                >
                   {showMorePast ? "Show Less" : "Show More"}
                </Button>
              </Box>
            )}
          </Box>
        )}

         {/* Handle case where there are no events at all */}
         {events.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', mt: 6, mb: 6 }}>
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
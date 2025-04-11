import { Box, Container, Typography, Button, Card, Grid, CardContent } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import HandshakeIcon from "@mui/icons-material/Handshake";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { LightbulbOutlined } from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "./page.css";
import { Schedule_meet_link } from "../../assets/links";
import { Submit_details_form } from "../../assets/links";

const services = [
  {
    title: "Do you have a Technology that need to be developed?",
    description: "Share your technology development needs with us. Our team of experts will help you navigate the development process and connect you with the right resources.",
    icon: RocketLaunchIcon
  },
  {
    title: "Are you interested in licensing our technology or collaborating in its development?",
    description: "Whether you're looking to license our existing technologies or work with us to develop new ones, we're open to collaboration. Share your interests and requirements through our collaboration portal.",
    icon: HandshakeIcon
  },
  {
    title: "Do you have a technology and want us to commercialize or license it to industry?",
    description: "If you have a technology that you believe has commercial potential, share the details with us. We specialize in commercializing technologies and can explore opportunities for licensing or industry partnerships.",
    icon: StorefrontIcon
  },
  {
    title: "Want to list your ongoing work for our records or any future opportunity?",
    description: "If you wish to contribute to our collaborative ecosystem by listing your ongoing work or expressing interest in potential future opportunities, we encourage you to share your details with us.",
    icon: FormatListBulletedIcon
  },
  {
    title: "Making Ideas Real",
    description: "Dreaming of starting your own thing or need advice on how to get there? We're here to help with advice on making your product.",
    icon: LightbulbOutlined
  }
];


export default function Collaborate() {
  return (
    <Box className="collaborate-page">
      {/* Top Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="overline" className="service-label">
              Collaborative Opportunities
            </Typography>
            <Typography variant="h1" className="hero-title">
              Collaborate With Us
            </Typography>
            <Typography variant="body1" className="hero-description">
            Whether you're a company seeking innovative solutions, an individual with specific R&D requirements,
            or someone interested in technology licensing and commercialization, we welcome collaboration
            opportunities. At our Tech Transfer Office, we believe in fostering partnerships that drive innovation
            and bring ideas to life.
            </Typography>
            <Box className="hero-buttons">
              <a href={Schedule_meet_link} target="blank" rel="noreferrer">
                <Button className="contained" color="primary" size="large">
                  Schedule a Meeting
                </Button>
              </a>
              <a href={Submit_details_form} target="blank" rel="noreferrer">
                <Button className="outlined" size="large">
                  Submit your Details
                </Button>
              </a>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" className="services-section">
        <Grid container spacing={3}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={service.title}>
                <Card className="service-card">
                  <CardContent>
                    <Box className="service-icon">
                      <Icon />
                    </Box>
                    <Typography variant="h6" className="service-title">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" className="service-description">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Bottom Hero Section */}
      <Box className="hero-section bottom-hero">
        <Container>
          <Typography variant="h2" className="bottom-title">
            Not sure where to start?
          </Typography>
          <Typography variant="body1" className="bottom-description">
            Schedule a consultation with our team to discuss your needs and explore collaboration opportunities.
          </Typography>
          <Box className="bottom-buttons">
            <a href={Schedule_meet_link} target="blank" rel="noreferrer">
              <Button variant="contained" className="conatined schedule-button">
                Schedule a Consultation
              </Button>
            </a>
            <a href='./Our_Technology'>
              <Button variant="outlined" className="outlined stories-button">
                View Success Stories
              </Button>
            </a>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
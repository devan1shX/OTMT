 
import React from 'react';
import { 
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Grid
} from '@mui/material';
import {
  CalendarMonth,
  Groups,
  LightbulbOutlined,
  ArrowForward
} from '@mui/icons-material';
import './page.css';
import { Schedule_meet_link } from '../../../assets/links';
import { Idea_disclosure_form } from '../../../assets/links';
import { Policies } from '../../../assets/links';

const services = [
  {
    title: "Innovate and Collaborate",
    description: "Submit Your Ideas and Projects. Share your innovative ideas, research, or projects with us.",
    icon: CalendarMonth
  },
  {
    title: "From Concept to Market",
    description: "Help in turning your concepts into market-ready products.",
    icon: LightbulbOutlined
  },
  {
    title: "Secure Your Innovations",
    description: "Protect your intellectual property and innovations.",
    icon: ArrowForward
 },
  {
    title: "Wish to Start Your Venture?",
    description: "Support and guidance for starting your own venture.",
    icon: ArrowForward
  }, 
  {
    title: "Collaborate to Innovate",
    description: "We foster partnerships and idea exchange to drive innovation. Our commitment is to guide you in turning ideas into impactful realities.",
    icon: Groups
  }
];


const StudentResourcesPage = () => {
  return (
    <Box className="innovation-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="overline" className="service-label">
              Resources
            </Typography>
            <Typography variant="h1" className="hero-title">
                Resources for Students
            </Typography>
            <Typography variant="body1" className="hero-description">
            At our office, we're dedicated to empowering students to translate their ideas into impactful solutions. Whether you're a student researcher or simply passionate about innovation, we provide the resources and support to guide you from concept to reality. From safeguarding intellectual property to fostering collaborations with industry. Join us in turning your innovations into tangible contributions to society, while gaining valuable skills and experience along the way.
            </Typography>
            <Box className="hero-buttons">
              <a href= {Schedule_meet_link} target="_blank" rel="noreferrer">
                <Button className="contained" color="primary" size="large">
                  Schedule a Meeting
                </Button>
              </a>
              <a href = {Idea_disclosure_form} target="_blank" rel="noreferrer">
                <Button className="outlined" size="large">
                  Submit Form
                </Button>
              </a>
              <a href = {Policies} target="_blank" rel="noreferrer">
                <Button className="outlined" size="large">
                  View Policy
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
                    <Box className="service-card-header">
                        <Box className="service-icon">
                        <Icon />
                        </Box>
                        <Typography variant="h6" className="service-title">
                        {service.title}
                        </Typography>
                    </Box>
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
    </Box>
  );
};

export default StudentResourcesPage;
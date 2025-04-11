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
  Message,
  Business,
  LightbulbOutlined,
} from '@mui/icons-material';
import './page.css';
import { Schedule_meet_link } from '../../../assets/links';
import { Idea_disclosure_form } from '../../../assets/links';
import { Policies } from '../../../assets/links';

const services = [
  {
    title: "Looking for outsourcing your Research or Technology",
    description: "If you're seeking to outsource research or technology-related work, we're here to assist you. Please fill out the form provided in the link to give us more details about your requirements.",
    icon: CalendarMonth
  },
  {
    title: "Interested in licensing out our Technology",
    description: "If you're interested in licensing our cutting-edge technology, please fill out the form provided in the link.",
    icon: Groups
  },
  // {
  //   title: "Want to apply for IPR ?",
  //   description: "Protect your intellectual property by applying for Intellectual Property Rights (IPR). Submit the form available at the provided link to start the process.",
  //   icon: Message
  // },
  // {
  //   title: "Need help for fundraising ?",
  //   description: "We offer consulting services and contract research opportunities.",
  //   icon: Business
  // },
  {
    title: "Want to discuss something about your product or service",
    description: "Help in turning your concepts into market-ready products.",
    icon: LightbulbOutlined
 }
];


const PartnerResourcesPage = () => {
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
              Resources for Partner
            </Typography>
            <Typography variant="body1" className="hero-description">
            Whether you're looking to outsource research or technology-related work, explore licensing opportunities for cutting-edge technology we're here to support you every step of the way. We are committed to providing high-quality solutions tailored to your needs and fostering meaningful collaborations. We're excited to work with you and help bring your vision to life.
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

export default PartnerResourcesPage;

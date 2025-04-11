import React from 'react';
import { 
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  CalendarMonth,
  Groups,
  Message,
  Business,
  ExpandMore,
  LightbulbOutlined
} from '@mui/icons-material';
import { Innovate_disclosure_form, Schedule_meet_link } from '../../../assets/links';
import './page.css';

const services = [
  {
    title: "Access Innovation",
    description: "Explore our wide range of technologies, from patents to software, which you can use for your projects.",
    icon: CalendarMonth,
  },
  {
    title: "Strategic Partnerships",
    description: "Join forces with industry leaders and experienced professionals to bring your ideas to life.",
    icon: Groups,
  },
  {
    title: "Intellectual Property Management",
    description: "We'll keep your ideas safe and secure, ensuring that your innovations are protected.",
    icon: Message
  },
  {
    title: "Commercialisation Support",
    description: "We provide all the guidance you need to transform your research into viable products and services.",
    icon: Business
  },
  {
    title: "Entrepreneurial Ecosystem",
    description: "Join our dynamic network of creators, startups, and mentors dedicated to fostering growth and success.",
    icon: LightbulbOutlined
  }
];

// TECH LISENCING

const faqs = [
  {
    question: "What is the Technology Licensing and Research Commercialization program, and who can benefit from it?",
    answer: "The program is designed to turn innovative ideas into real-world solutions. It benefits businesses looking to innovate, researchers aiming to make an impact, and anyone interested in collaborative opportunities.",
  },
  {
    question: "How can I access innovation through the program?",
    answer: "Explore our rich portfolio of intellectual assets, from patents to software, ready for licensing and collaboration. Details on available innovations can be found on our platform.",
  },
  {
    question: "What are the benefits of forging strategic partnerships within the program?",
    answer: "Forge powerful alliances with our network of industry leaders, researchers, and entrepreneurs. Collaborative partnerships can enhance your innovation journey and open doors to new opportunities.",
  },
  {
    question: "How does Intellectual Property Management safeguard my ideas within the program?",
    answer: "Our expert IP management ensures that your ideas remain protected throughout the licensing and commercialization process, providing a secure environment for your innovations.",
  },
  {
    question: "What kind of commercialization support is provided in the program?",
    answer: "Receive comprehensive guidance to turn research breakthroughs into successful products and services. Our support covers various aspects of commercialization, from strategy development to market entry.",
  },
  {
    question: "How can I join the entrepreneurial ecosystem mentioned in the program?",
    answer: "Join the vibrant community of innovators, startups, and mentors we enjoy. Connect with us through the provided channels, and we'll guide you on becoming part of the entrepreneurial ecosystem.",
  },
  {
    question: "Is there a cost associated with accessing the intellectual assets for licensing?",
    answer: "The costs associated with accessing intellectual assets for licensing may vary. Details on licensing fees and terms can be obtained by reaching out to our licensing and commercialization team.",
  },
  {
    question: "How can businesses benefit specifically from the program?",
    answer: "Businesses can benefit by accessing cutting-edge technologies for licensing, forging strategic partnerships, receiving commercialization support, and tapping into funding opportunities to drive innovation and growth.",
  },
  {
    question: "Can individual researchers participate in the program, or is it exclusive to businesses?",
    answer: "The program is open to both individual researchers and businesses. Whether you're a solo innovator or part of a larger organization, we welcome your participation and collaboration.",
  },
  {
    question: "How can I stay updated on available intellectual assets and collaboration opportunities?",
    answer: "Regularly check our platform for updates on available intellectual assets, collaboration opportunities, and announcements related to the Technology Licensing and Research Commercialization program.",
  },
  {
    question: "Is there a specific application process to join the program, and how can I get started?",
    answer: "Contact our team through the provided channels to inquire about joining the program. We'll guide you through any application process and provide the necessary information to get started.",
  },
];

const TechLicensingPage = () => {
  return (
    <Box className="innovation-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="overline" className="service-label">
              Innovation Services
            </Typography>
            <Typography variant="h1" className="hero-title">
              Technology Licensing
            </Typography>
            <Typography variant="body1" className="hero-description">
            We're here to help turn exciting new ideas into real-world solutions. Whether you're a company looking to innovate or a researcher wanting to make a difference, find out how we can help you succeed
            </Typography>
            <Box className="hero-buttons">
              <a href={Schedule_meet_link} target="_blank" rel="noreferrer">
              <Button className="contained" color="primary" size="large">
                Schedule a Meeting
              </Button>
              </a>
              <a href={Innovate_disclosure_form} target="_blank" rel="noreferrer">
              <Button className="outlined" size="large">
                Submit Technology for Licensing 
              </Button>
              </a>
              <a href='../Our_Technology'>
              <Button className="outlined" size="large">
                Looking for technologies
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

      {/* CTA Section */}
      <Box className="cta-section">
        <Container maxWidth="lg">
          <Box className="cta-content">
            <Typography variant="h2">
              Ready to Start Your Innovation Journey?
            </Typography>
            <Typography variant="body1">
              Schedule a meeting with our experts to discuss your ideas and get started on your innovation journey.
            </Typography>
            <Box className="cta-buttons">
              <a href={Schedule_meet_link} target="_blank" rel="noreferrer">
              <Button className="contained" color="primary" size="large">
                Schedule a Meeting
              </Button>
              </a>
              <a href='../Our_Technology'>
              <Button className="outlined" size="large">
                Browse Past Success Stories
              </Button>
              </a>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" className="faq-section">
        <Typography variant="h2" align="center" className="faq-title">
          Frequently Asked Questions
        </Typography>
        <Box className="faq-container">
          {faqs.map((faq, index) => (
            <Accordion key={index} className="faq-accordion">
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6" className="faq-question">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-answer">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TechLicensingPage;
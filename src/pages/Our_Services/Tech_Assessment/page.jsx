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
  LightbulbOutlined,
  ExpandMore
} from '@mui/icons-material';
import './page.css';
import { Policies, Schedule_meet_link, Submit_details_form } from '../../../assets/links';

const services = [
  {
    title: "Streamline Focus",
    description: "Helps you set clear goals and work towards them.",
    icon: CalendarMonth,
  },
  {
    title: "Innovation Tracking",
    description: "Lets you see how your new ideas are progressing, which helps with planning.",
    icon: Groups,
  },
  {
    title: "Market Edge",
    description: "Gives you tips to stay ahead of competitors.",
    icon: Message,
  },
  {
    title: "Entry Tactics",
    description: "Advises you on the best ways to start selling your product.",
    icon: Business,
  },
  {
    title: "Smart Resourcing",
    description: "Shows you how to use your resources wisely.",
    icon: LightbulbOutlined,
  },
  {
    title: "Strategic Choice",
    description: "Helps you decide which projects are worth focusing on.",
    icon: LightbulbOutlined,
  }
];

// TECH ASSESSMENT

const faqs = [
  {
    question: "What is a Technology Maturity Assessment, and why is it important?",
    answer: "A Technology Maturity Assessment is a comprehensive evaluation process that determines the readiness of a technology or innovation for real-world applications. It is crucial for understanding where your innovations stand on the path to success."
  },
  {
    question: "Who can benefit from a Technology Maturity Assessment?",
    answer: "Both startups looking to attract investors and established companies seeking to diversify can benefit from a Technology Maturity Assessment to navigate the journey from concept to market success."
  },
  {
    question: "What does the assessment process involve?",
    answer: "The assessment process involves a systematic analysis of various factors to gauge the current state and future prospects of a technology. It provides a roadmap for realizing the full potential of innovations."
  },
  {
    question: "What is Technology Readiness Level (TRL), and why is it important?",
    answer: "TRL is a measure of the maturity of a technology, ranging from concept (TRL 1) to fully deployed (TRL 9). Understanding TRL is crucial for making informed decisions and improving the chances of successful technology development and commercialization."
  },
  {
    question: "How does TRL evaluation guide the development process?",
    answer: "TRL evaluation helps innovators focus on reaching specific readiness levels, making it easier to track progress, meet milestones, and streamline the development process."
  },
  {
    question: "How does TRL assessment contribute to monitoring and managing innovation?",
    answer: "TRL knowledge allows organizations to monitor progress and estimate the time required to bring a technology to market, facilitating effective progress tracking and growth management."
  },
  {
    question: "How does understanding TRL provide a competitive advantage?",
    answer: "Knowing your technology's TRL relative to competitors enables effective positioning of your innovation, identifying areas for gaining a competitive edge in the market."
  },
  {
    question: "How does TRL assessment inform market entry strategies?",
    answer: "TRL assessment helps organizations decide when and how to introduce their technology into the market, maximizing the chances of success through informed market entry strategies."
  },
  {
    question: "How does TRL assessment contribute to resource allocation?",
    answer: "By understanding the current level of technology readiness, organizations can allocate resources effectively, ensuring efficient use of time and budget where they are needed most."
  },
  {
    question: "How can TRL assessments be used for strategic decision-making?",
    answer: "Organizations can use TRL assessments to make strategic decisions about their technology portfolio, focusing on technologies with the highest potential for success."
  },
  {
    question: "How does TRL assessment impact scaling and commercialization?",
    answer: "Technologies at higher TRL levels are more likely to scale and succeed in the market. TRL assessment helps organizations determine the readiness of their innovations for successful commercialization."
  },
  {
    question: "How can I initiate a Technology Maturity Assessment for my innovation?",
    answer: "Contact our team through the provided channels to initiate a Technology Maturity Assessment for your innovation. Our experts will guide you through the process and provide tailored assistance based on your needs."
  }
];

const InnovationPage = () => {
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
              Technology Maturity Assessment
            </Typography>
            <Typography variant="body1" className="hero-description">
            Technology Maturity Assessment is a comprehensive evaluation process determining how ready your technology or invention is for real-world application. It provides an in-depth analysis of various aspects of the technology to assess its current level of development and its potential for future success. By examining both the technical and market readiness, this assessment helps identify the steps required to transition technology from concept to commercialization.
            </Typography>
            <Box className="hero-buttons">
              <a href={Schedule_meet_link} target="_blank" rel="noreferrer">
              <Button className="contained" color="primary" size="large">
                Contact to evaluate TRL
              </Button>
              </a>
              <a href={Submit_details_form} target="_blank" rel="noreferrer">
              <Button className="outlined" size="large">
                Submit your Details
              </Button>
              </a>
              <a href={Policies} target="_blank" rel="noreferrer">
              <Button className="outlined" size="large">
                Policies and SOP
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

export default InnovationPage;
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
  ExpandMore
} from '@mui/icons-material';
import { IP_disclosure_form, Policies, Schedule_meet_link } from '../../../assets/links';
import './page.css';

const services = [
  {
    title: "IPR Protection",
    description: "IPR makes sure nobody can steal your ideas and profit from them without your permission.",
    icon: CalendarMonth,
  },
  {
    title: "IPR Royalty",
    description: "With IPR, you can let others use your ideas, but they have to pay you for it. It's like renting out your house – you earn money while still owning it.",
    icon: Groups,
  },
  {
    title: "Encourages Innovation",
    description: "Knowing their ideas are safe, people are more likely to come up with new and cool stuff that can improve our lives.",
    icon: Message
  },
  {
    title: "Supports Business Growth",
    description: "IPR can make your company more valuable. Investors like to see that your ideas are protected because it means they're investing in something secure.",
    icon: Business
  }
];

// IPR MANAGEMENT
const faqs = [
  {
    question: "What is IPR, and why is it important for innovation?",
    answer:
      "Intellectual Property Rights (IPR) are legal protections for intellectual creations. They are crucial for innovation as they secure and maximize the value of groundbreaking ideas during the technology transfer process.",
  },
  {
    question: "What activities are involved in IPR consultation and strategy?",
    answer:
      "IPR consultation involves a comprehensive process to devise an effective strategy aligned with goals and objectives, ensuring the protection and profitability of innovative ideas.",
  },
  {
    question: "How does Patentability Assessment contribute to the protection of technology?",
    answer:
      "Patentability Assessment evaluates the novelty and inventiveness of a technology, determining its eligibility for a patent and ensuring it meets the necessary criteria for legal protection.",
  },
  {
    question: "Can you explain the process of filing a patent and what it involves?",
    answer:
      "Filing a patent includes managing the entire process, drafting claims, preparing required documents, navigating patent office procedures, responding to office actions, and representing clients during prosecution.",
  },
  {
    question: "What is Patent Portfolio Management, and why is it important?",
    answer:
      "Patent Portfolio Management involves strategically managing and maintaining a portfolio of patents to maximize their value and protection. Regular reviews and updates are done based on business objectives and market trends.",
  },
  {
    question: "How does Licensing and Technology Transfer work in the context of IPR?",
    answer:
      "Licensing agreements are negotiated and drafted to allow third parties to use, sell, or develop patented technology. This process facilitates the transfer of technology and intellectual property between entities.",
  },
  {
    question: "What is the purpose of IPR Commercialization Strategy?",
    answer:
      "IPR Commercialization Strategy involves developing plans to effectively commercialize IP assets, considering market dynamics and competition. It identifies potential licensing opportunities, partnerships, or ventures for monetizing intellectual property.",
  },
  {
    question: "How can I participate in IPR Training and Workshops?",
    answer:
      "Keep an eye on our announcements for upcoming training sessions and workshops. You can register for these events to enhance your understanding of intellectual property, its importance, and best practices.",
  },
  {
    question: "What is Freedom to Operate (FTO) Analysis, and why is it important?",
    answer:
      "FTO Analysis ensures that a technology does not infringe existing patents or IP rights. It provides recommendations on mitigating patent infringement risk, allowing you to proceed confidently with your innovation.",
  },
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
              IPR Management
            </Typography>
            <Typography variant="body1" className="hero-description">
            IPR is like a shield for your brilliant ideas, inventions, and creations. It's a way to legally protect your work so others can't steal or copy it without permission. Just like how you lock your house to keep your stuff safe, IPR locks up your ideas so only you can use them.
            </Typography>
            <Box className="hero-buttons">
              <a href={Schedule_meet_link} target="_blank" rel="noreferrer">
              <Button className="contained" color="primary" size="large">
                Schedule a Meeting
              </Button>
              </a>
              <a href={IP_disclosure_form} target="_blank" rel="noreferrer">
              <Button className="outlined" size="large">
                Apply for IPR
              </Button>
              </a>
              <a href={Policies} target="_blank" rel="noreferrer">
              <Button className="outlined" size="large">
                IPR Policies
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
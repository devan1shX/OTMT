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
import { Schedule_meet_link } from '../../../assets/links';

const services = [
  {
    title: "Workshops",
    description: "Dive into fun workshops! From making new tech work to learning about protecting your ideas, we make innovation a blast for everyone.",
    icon: CalendarMonth
  },
  {
    title: "Innovation Events",
    description: "Don't miss our cool events! From hackathons to showcases, it's your chance to shine and meet other creative minds.",
    icon: Groups
  },
  {
    title: "Talk to Experts",
    description: "Got an idea? Chat one-on-one with our experts. We'll guide you on how to solve problems, polish your idea, and make it stand out.",
    icon: Message
  },
  {
    title: "Meet Industry Players",
    description: "We help you meet the big players in the industry. A great chance to find a partner, start a joint project, or get your idea licensed.",
    icon: Business
  },
  {
    title: "Making Ideas Real",
    description: "Dreaming of starting your own thing or need advice on how to get there? We're here to help with advice on making your product.",
    icon: LightbulbOutlined
  }
];

// FACILITATE INNOVATION

const faqs = [
  {
    question: "Who can participate in the workshops and events?",
    answer: "Workshops and events are open to students, faculty members, and external entrepreneurs interested in fostering innovation.",
  },
  {
    question: "What topics are covered in the hand-on workshops?",
    answer: "Workshops cover a range of topics, including Technology Readiness, intellectual property rights, design thinking, and entrepreneurship.",
  },
  {
    question: "How can I updated on innovation events and competitions?",
    answer: "Regularly check our platform for announcements, subscribe to our newsletter, and follow us on social media for real-time updates on events, hackathons, and competitions.",
  },
  {
    question: "What is the purpose of the Research showcase an Industry connect events?",
    answer: "These events serve to bring ecosystem partners together, providing a platform for knowledge sharing, collaboration, and networking between academia, researchers, and industry professionals.",
  },
  {
    question: "How can I schedule a one on one innovation consultation?",
    answer: "Contact our team through the provided channels to schedule a personalized consultation with our innovation experts.",
  },
  {
    question: "What types of advisory services are offered during one on one consultations?",
    answer: "Our experts provide guidance on idea development, problem-solving, innovation strategies, and tailored commercialization roadmaps.",
  },
  {
    question: "How can I connect with industry leaders for collaboration opportunities?",
    answer: "We facilitate corporate connections, offering opportunities to collaborate with industry leaders through innovation partnerships, joint ventures, or technology licensing.",
  },
  {
    question: "What support is available for commercialization, startup, and funding needs?",
    answer: "We offer guidance on transforming innovative ideas into market-ready products or services, including advice on product development, market research, business strategies, and funding avenues.",
  },
  {
    question: "Can external entrepreneurs participate in startup advisory services?",
    answer: "Yes, our startup advisory services are open to both internal stakeholders (students and faculty) and external entrepreneurs seeking guidance on commercialization and funding.",
  },
  {
    question: "How can I showcase my innovative ideas in your events?",
    answer: "Participate in our innovation events, hackathons, and competitions to showcase your ideas and collaborate with like-minded innovators. Follow the registration process provided for each specific event.",
  },
  {
    question: "Is there a cost associated with participating in the workshops and events?",
    answer: "Most of our workshops and events are open and free for participants. However, specific events may have registration fees, which will be clearly communicated in the event details.",
  },
  {
    question: "How do I inquire about available funding opportunities for my startup?",
    answer: "During one-on-one consultations, our experts can guide you on funding avenues and provide information on available resources and opportunities based on your startup's specific needs.",
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
              Facilitate Innovation and Awareness
            </Typography>
            <Typography variant="body1" className="hero-description">
              Our goal is to create a dynamic ecosystem where innovation thrives. Whether you're a student, faculty
              member, or external entrepreneur, we provide the tools, knowledge, and connections needed to turn your
              ideas into impactful innovations.
            </Typography>
            <Box className="hero-buttons">
            <a href={Schedule_meet_link} target="_blank" rel="noreferrer">
              <Button className="contained" color="primary" size="large" >
                Schedule a Meeting
              </Button>
            </a>
            <a href='../Event'>
              <Button className="outlined" size="large">
                View Upcoming Events
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
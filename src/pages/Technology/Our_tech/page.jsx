import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import {ArrowForward} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./page.css";
import { Schedule_meet_link } from "../../../assets/links";


const cardsData = [
  {
    category: 'CV',
    trlLevel: '6',
    title: 'Seek and Suspect',
    description: 'The novel aspect of this project lies in an innovative and fully automated technology for facial image retrieval in criminal investigations',
    innovators: ': Dr. Rajiv Ratna Shah'
  },
  {
    category: 'IoT',
    trlLevel: '7',
    title: 'Cloud Labs',
    description: 'Cloud Lab is an innovative platform at the forefront of reshaping hands-on learning for the digital era.',
    innovators: ' Dr Sumit Darak'
  },
  {
    category: 'IoT',
    trlLevel: '7',
    title: 'TATDC',
    description: 'The Trainer and Tester for Digital Circuits (TATDC) is an innovative project that leverages advanced technology to provide a comprehensive solution for digital circuit experimentation.',
    innovators: 'Dr. Rahul Gupta, Manager, Department of ECE'
  },
  {
    category: 'NLP',
    trlLevel: '6',
    title: 'FOODLE',
    description: 'Foodle, a culinary word game, capitalizes on the intrinsic connection between language and food.',
    innovators: 'Dr. Rajiv Ratn Shah'
  }
];

const faqItems = [
  {
    question: "How can I schedule a meeting with an innovation expert?",
    answer:
      "You can schedule a meeting through our online booking system or contact our office directly. Our team will match you with the most suitable expert for your needs.",
  },
  {
    question: "What types of workshops do you offer?",
    answer:
      "We offer a variety of workshops including innovation and entrepreneurship, intellectual property rights, research commercialization, and industry collaboration sessions.",
  },
  {
    question: "Can students participate in all events?",
    answer:
      "Yes, most of our events are open to students. Some specialized workshops may have specific eligibility requirements which will be clearly stated in the event details.",
  },
  {
    question: "How do you help connect with industry partners?",
    answer:
      "We facilitate connections through networking events, industry meetups, and our partner database. We also provide support in preparing pitch presentations and partnership proposals.",
  },
];



/* 
  TechList Component:
  - Filters the list of technologies based on search text, TRL level, innovators, and selected genres.
  - Paginates the filtered list.
  - Renders a list of TechCard components with animations.
*/


const TechnologyPage = () => {

  return (
    <div className="research-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="overline" className="service-label">
              Technologies at IIITD
            </Typography>
            <Typography variant="h1" className="hero-title">
              Our Technologies
            </Typography>
            <Typography variant="body1" className="hero-description">
            At IIIT Delhi, we are driven by innovation, collaboration, and the pursuit of a brighter future. Our multifaceted Office of Technology Management and Transfer (OTMT) is at the forefront of fostering positive change, advancing technology, and ensuring innovation has a long lasting impact.
            </Typography>
            <Box className="hero-buttons">
              <a href="../Explore_Technologies">
              <Button className="contained" color="primary" size="large">
                Explore Technologies
              </Button>
              </a>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Technology Cards */}
      <Container className="section">
        <Grid container spacing={2.5}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="tech-card">
              <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
                <Box className="tech-card-top">
                  <Box className="tech-card-header">
                    <Chip 
                      label={card.category} 
                      className="category-chip"
                      size="small"
                    />
                    <Chip 
                      label={`TRL-${card.trlLevel}`} 
                      className="trl-chip"
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="h5" component="h2" className="tech-card-title">
                    {card.title}
                  </Typography>
                  
                  <Typography variant="body2" className="tech-card-description">
                    {card.description}
                  </Typography>
                </Box>
                
                <Box className="tech-card-footer">
                  <Typography variant="body2" className="innovators-text">
                    <span className="innovators-label">Innovators:</span> {card.innovators}
                  </Typography>
                  <ArrowForward className="arrow-icon" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>


      

      {/* Updated CTA Section */}
      <Box className="journey-cta-section">
        <Container>
          <Box className="journey-cta-content">
            <Typography variant="h2" className="journey-title">
              Want to register your own technology ?
            </Typography>
            <Typography variant="body1" className="journey-subtitle">
              Schedule a meeting with our experts to discuss your ideas and get started on your innovation journey.
            </Typography>
            <Box className="journey-buttons">
              <a href={Schedule_meet_link} target="_blank" rel="noreferrer">
              <Button variant="contained" className=" schedule-button">
                Schedule a Meeting
              </Button>
              </a>
              {/* <a href="../Our_Technologies" target="_blank" rel="noreferrer">
              <Button variant="outlined" className=" browse-button">
                Browse Past Success Stories
              </Button>
              </a> */}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* FAQ Section
      <Container className="faq-section">
        <Typography variant="h2" className="faq-title">
          Frequently Asked Questions
        </Typography>
        <Box className="faq-container">
          {faqItems.map((item, index) => (
            <Accordion key={index} className="faq-accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6" className="faq-question">
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-answer">{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container> */}
    </div>
  );
};

export default TechnologyPage;
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
  AccordionDetails,
  Chip,
} from "@mui/material";
import {
  CalendarMonth,
  Business,
  LightbulbOutlined,
  ExpandMore,
  CheckCircle,
  ArrowForward,
} from "@mui/icons-material";
import "./page.css";
import { Schedule_meet_link, Policies } from "../../../assets/links";

const services = [
  {
    title: "IIITD Innovation and Incubation Center",
    shortName: "IIITD - IIC",
    description:
      "Supporting early-stage startups with comprehensive resources and mentorship.",
    offeringsTitle: "OFFERINGS:",
    bulletPoints: [
      "Incubation Programs: Tailored support to help startups in early-stage development",
      "Mentorship: Guidance from experienced entrepreneurs and industry professionals",
      "Networking Opportunities: Access to a vast network of investors, industry leaders, and potential collaborators",
      "Funding Access: Help in securing seed funding and access to various funding opportunities",
    ],
    icon: CalendarMonth,
    color: "#258F83", // primary theme color
    link: "https://iic.iiitd.ac.in/",
  },
  {
    title: "IHUB Anubhuti Foundation",
    shortName: "IHUB",
    description:
      "Advancing cognitive computing and AI innovations through research and collaboration.",
    offeringsTitle: "OFFERINGS:",
    bulletPoints: [
      "Research and Development: Access to cutting-edge research in cognitive computing and AI",
      "Collaboration Opportunities: Work with researchers and industry experts to bring your innovations to life",
      "Startup Incubation: Support for startups developing solutions in the fields of AI and IoT",
      "Commercialization Support: Help in turning research projects into viable, market-ready products",
    ],
    icon: LightbulbOutlined,
    color: "#1F7A70", // a darker variant within the theme
    link: "https://anubhuti.tech/",
  },
  {
    title: "Electropreneur Park",
    shortName: "STPI",
    description:
      "Specialized facilities and expertise for hardware and electronics innovations.",
    offeringsTitle: "OFFERINGS:",
    bulletPoints: [
      "Specialized Infrastructure: Access to state-of-the-art electronics and hardware facilities",
      "Sector-Specific Mentorship: Guidance from experts in electronics system design and manufacturing",
      "Business Acceleration: Support in scaling hardware innovations to market",
      "Investment Access: Opportunities to connect with investors focused on hardware startups",
    ],
    icon: Business,
    color: "#2BA39C", // a lighter variant within the theme
    link: "https://electropreneurpark.in/",
  },
];

// STARTUP FACILIATION

const faqs = [
  {
    question: "Who can benefit from the startup facilitation services?",
    answer:
      "Our services cater to aspiring entrepreneurs, startups, and existing businesses looking to innovate and grow.",
  },
  {
    question: "How do I join the Entrepreneurship Cell (ECELL)?",
    answer:
      "To join ECELL, participate in our events, workshops, and community gatherings. Connect with us through our platform or attend our networking sessions.",
  },
  {
    question: "What resources does the Innovation Hub (IHUB) provide for startups?",
    answer:
      "IHUB offers a collaborative workspace, access to prototyping tools, and a community of innovators. It provides an environment conducive to ideation and experimentation.",
  },
  {
    question: "How can I get incubation support from IITDIC?",
    answer:
      "Reach out to the IITDIC team through the provided channels to inquire about incubation support. Share details about your startup, and they will guide you through the application process.",
  },
  {
    question: "Are the mentorship programs tailored to specific industries?",
    answer:
      "Yes, our mentorship programs are customized to cater to diverse industries. We match startups with mentors who have expertise relevant to their business.",
  },
  {
    question: "What is the Technology Licensing and Research Commercialization program, and who can benefit from it?",
    answer:
      "The program is designed to turn innovative ideas into real-world solutions. It benefits businesses looking to innovate, researchers aiming to make an impact, and anyone interested in collaborative opportunities.",
  },
  {
    question: "How can I access innovation through the program?",
    answer:
      "Explore our rich portfolio of intellectual assets, from patents to software, ready for licensing and collaboration. Details on available innovations can be found on our platform.",
  },
  {
    question: "What are the benefits of forging strategic partnerships within the program?",
    answer:
      "Forge powerful alliances with our network of industry leaders, researchers, and entrepreneurs. Collaborative partnerships can enhance your innovation journey and open doors to new opportunities.",
  },
  {
    question: "How does Intellectual Property Management safeguard my ideas within the program?",
    answer:
      "Our expert IP management ensures that your ideas remain protected throughout the licensing and commercialization process, providing a secure environment for your innovations.",
  },
  {
    question: "What kind of commercialization support is provided in the program?",
    answer:
      "Receive comprehensive guidance to turn research breakthroughs into successful products and services. Our support covers various aspects of commercialization, from strategy development to market entry.",
  },
  {
    question: "Are there funding opportunities available through the program?",
    answer:
      "Yes, tap into diverse funding sources and grants to accelerate your innovation journey. We provide information and assistance on securing funding opportunities relevant to your project.",
  },
  {
    question: "How can I join the entrepreneurial ecosystem mentioned in the program?",
    answer:
      "Join the vibrant community of innovators, startups, and mentors we enjoy. Connect with us through the provided channels, and we'll guide you on becoming part of the entrepreneurial ecosystem.",
  },
  {
    question: "Is there a cost associated with accessing the intellectual assets for licensing?",
    answer:
      "The costs associated with accessing intellectual assets for licensing may vary. Details on licensing fees and terms can be obtained by reaching out to our licensing and commercialization team.",
  },
  {
    question: "How can businesses benefit specifically from the program?",
    answer:
      "Businesses can benefit by accessing cutting-edge technologies for licensing, forging strategic partnerships, receiving commercialization support, and tapping into funding opportunities to drive innovation and growth.",
  },
  {
    question: "Can individual researchers participate in the program, or is it exclusive to businesses?",
    answer:
      "The program is open to both individual researchers and businesses. Whether you're a solo innovator or part of a larger organization, we welcome your participation and collaboration.",
  },
  {
    question: "How can I stay updated on available intellectual assets and collaboration opportunities?",
    answer:
      "Regularly check our platform for updates on available intellectual assets, collaboration opportunities, and announcements related to the Technology Licensing and Research Commercialization program.",
  },
  {
    question: "Is there a specific application process to join the program, and how can I get started?",
    answer:
      "Contact our team through the provided channels to inquire about joining the program. We'll guide you through any application process and provide the necessary information to get started.",
  },
];

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 3,
        overflow: 'visible',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        position: 'relative',
        border: '1px solid #f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
        }
      }}
    >
      {/* Top accent bar with color */}
      <Box 
        sx={{ 
          height: '8px', 
          width: '100%', 
          background: `linear-gradient(90deg, ${service.color} 0%, ${service.color}CC 100%)`,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />

      {/* Icon floating above card */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: '-25px',
          right: '25px',
          bgcolor: service.color,
          color: 'white',
          p: 1.5,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 14px ${service.color}40`,
          width: 50,
          height: 50,
          border: '2px solid white'
        }}
      >
        <Icon fontSize="medium" />
      </Box>

      <CardContent 
        sx={{ 
          p: 3, 
          pt: 4, 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {/* Service Header with fixed height */}
        <Box sx={{ mb: 3, height: '160px' }}>
          <Chip 
            label={service.shortName} 
            size="small" 
            sx={{ 
              mb: 2, 
              backgroundColor: `${service.color}15`, 
              color: service.color,
              fontWeight: 600,
              border: 'none'
            }} 
          />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, fontSize: '1.4rem' }}>
            {service.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {service.description}
          </Typography>
        </Box>

        {/* Offerings title */}
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontWeight: 'bold',
            color: service.color,
            fontSize: '0.9rem',
            mb: 2,
            letterSpacing: '0.5px'
          }}
        >
          {service.offeringsTitle}
        </Typography>

        {/* Bullet Points with fixed height container */}
        <Box sx={{ mb: 3, flex: 1, minHeight: '250px' }}>
          {service.bulletPoints.map((point, i) => (
            <Box key={i} sx={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              mb: 2,
              p: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: `${service.color}10`
              }
            }}>
              <CheckCircle sx={{ 
                color: service.color, 
                mr: 1.5, 
                fontSize: '1.2rem', 
                mt: 0.3,
                minWidth: '1.2rem', // Fixed width for icon
                filter: `drop-shadow(0 1px 2px ${service.color}30)`
              }} />
              <Typography variant="body2">{point}</Typography>
            </Box>
          ))}
        </Box>
        
        {/* Learn More Button */}
        <Box sx={{ mt: 'auto', alignSelf: 'flex-start' }}>
          <Button 
            variant="text" 
            endIcon={<ArrowForward />}
            href={service.link}
            sx={{ 
              color: service.color,
              fontWeight: 500,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: `${service.color}10`,
                '& .MuiButton-endIcon': {
                  transform: 'translateX(4px)'
                }
              },
              '& .MuiButton-endIcon': {
                transition: 'transform 0.3s ease'
              }
            }}
          >
            Learn more
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};




const StartupFacilitationPage = () => {
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
              Startup Facilitation
            </Typography>
            <Typography variant="body1" className="hero-description">
              At IIIT Delhi, we foster a vibrant startup ecosystem that empowers
              innovators and entrepreneurs to transform ideas into impactful
              ventures. Our support system equips both aspiring and seasoned
              business owners with essential tools, mentorship, networks, and
              resources. By integrating cutting-edge research, industry expertise,
              and entrepreneurial guidance, our innovation centers and hubs serve
              as dynamic launchpads supporting startups at every stage.
            </Typography>
            <Box className="hero-buttons">
              <a href={Schedule_meet_link} target="_blank" rel="noreferrer">
              <Button className="contained" color="primary" size="large">
                Schedule a Meeting
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

      {/* Services Section */}
      <Container maxWidth="lg" className="services-section">
        <Typography variant="h2" className="services-title">
          Our Innovation Ecosystem
        </Typography>
        <Typography variant="subtitle1" className="services-subtitle">
          Access comprehensive support through our partner organizations, each
          offering specialized resources for innovators and entrepreneurs
        </Typography>

        {/* Modern Card Grid Layout */}
        <Box className="services-grid-container">
          <Grid container spacing={4}>
            {services.map((service) => (
              <Grid item xs={12} md={4} key={service.title}>
                <ServiceCard service={service} />
              </Grid>
            ))}
          </Grid>
        </Box>
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

export default StartupFacilitationPage;

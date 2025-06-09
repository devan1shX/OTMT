import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Lightbulb,
  Business,
  Shield,
  Rocket,
  People,
  Description,
  ArrowForward,
  School,
  Science,
  Message,
  LightbulbOutlined,
  CalendarMonth,
  Groups,
  ExpandMore,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Schedule_meet_link } from "../../../assets/links";

const SectionTitle = styled(Typography)({
  marginBottom: "32px",
  fontWeight: 600,
  position: "relative",
  paddingBottom: "8px",
});

const StyledAccordion = styled(Accordion)({
  marginBottom: "16px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  borderRadius: "8px",
  overflow: "hidden",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "0 0 16px",
  },
});

const AccordionHeader = styled(AccordionSummary)({
  backgroundColor: "#259084",
  color: "#fff",
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "#fff",
  },
});

const FocusAreaCard = styled(Card)({
  height: "100%",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  },
});

const IconWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
  "& svg": {
    fontSize: 28,
    marginRight: "16px",
    color: "#259084",
  },
});

const QuickActionCard = styled(Card)({
  height: "100%",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  },
});

const researchAreas = [
  {
    title: "Artificial Intelligence",
    researchers: [
      {
        name: "Dr. Rajiv Ratn Shah",
        research:
          "Multimodal semantic and sentiment analysis of user-generated social media content",
      },
      {
        name: "Dr. Tavpritesh Sethi",
        research: "Big-data for clinical decision support, Human physiology",
      },
      {
        name: "Dr. V. Raghava Mutharaju",
        research:
          "Knowledge Graphs/Semantic Web, Ontology modeling and reasoning, Linked Data, Big Data",
      },
      {
        name: "Dr. Vinayak Abrol",
        research:
          "Acoustic modeling and coding, Voice biometrics, Pathological speech and audio categorization",
      },
    ],
  },
  {
    title: "Applied Mathematics",
    researchers: [
      {
        name: "Dr. Saket Anand",
        research:
          "Computer Vision, Machine Learning, Probabilistic Graphical Models",
      },
      {
        name: "Dr. Angshul Majumdar",
        research: "Signal Processing, Machine Learning, Compressive Sensing",
      },
      {
        name: "Dr. Sarthok Sircar",
        research: "Mathematical Biology, Fluid Dynamics, Soft Matter Physics",
      },
    ],
  },
  {
    title: "Bioinformatics",
    researchers: [
      {
        name: "Dr. Ganesh Bagler",
        research: "Systems Biology, Network Science, Computational Gastronomy",
      },
      {
        name: "Dr. Debarka Sengupta",
        research:
          "Computational Genomics, Single-cell Bioinformatics, Machine Learning",
      },
    ],
  },
  {
    title: "Computer Vision",
    researchers: [
      {
        name: "Dr. Chetan Arora",
        research: "Computer Vision, Machine Learning, Visual SLAM",
      },
      {
        name: "Dr. Saket Anand",
        research:
          "Computer Vision, Machine Learning, Probabilistic Graphical Models",
      },
      {
        name: "Dr. Avinash Sharma",
        research: "3D Vision, Shape Analysis, Medical Imaging",
      },
    ],
  },
  {
    title: "Machine Learning/Deep Learning",
    researchers: [
      {
        name: "Dr. Rajiv Ratn Shah",
        research: "Multimodal Deep Learning, Social Media Analysis",
      },
      {
        name: "Dr. Md. Shad Akhtar",
        research:
          "Natural Language Processing, Sentiment Analysis, Deep Learning",
      },
      {
        name: "Dr. Tanmoy Chakraborty",
        research: "Network Science, Social Computing, Cybersecurity",
      },
    ],
  },
];

const researchProjects = [
  {
    title: "AI for Healthcare",
    projects: [
      {
        name: "Early Disease Detection using Deep Learning",
        pi: "Dr. Tavpritesh Sethi",
        funding: "DST",
        duration: "2022-2025",
      },
      {
        name: "Medical Image Analysis for Diagnostic Support",
        pi: "Dr. Saket Anand",
        funding: "ICMR",
        duration: "2021-2024",
      },
      {
        name: "Voice-based Disease Detection",
        pi: "Dr. Vinayak Abrol",
        funding: "DBT",
        duration: "2023-2026",
      },
    ],
  },
  {
    title: "Smart Cities",
    projects: [
      {
        name: "Urban Traffic Management System",
        pi: "Dr. Sanjit Kaul",
        funding: "MeitY",
        duration: "2022-2025",
      },
      {
        name: "Air Quality Monitoring and Prediction",
        pi: "Dr. Pravesh Biyani",
        funding: "DST",
        duration: "2021-2024",
      },
      {
        name: "Smart Energy Management",
        pi: "Dr. Amarjeet Singh",
        funding: "MHRD",
        duration: "2023-2026",
      },
    ],
  },
  {
    title: "Cybersecurity",
    projects: [
      {
        name: "Secure Authentication Systems",
        pi: "Dr. Sambuddho Chakravarty",
        funding: "DRDO",
        duration: "2022-2025",
      },
      {
        name: "Network Traffic Analysis for Threat Detection",
        pi: "Dr. Tanmoy Chakraborty",
        funding: "MeitY",
        duration: "2021-2024",
      },
      {
        name: "Privacy-Preserving Machine Learning",
        pi: "Dr. Mukulika Maity",
        funding: "DST",
        duration: "2023-2026",
      },
    ],
  },
  {
    title: "Natural Language Processing",
    projects: [
      {
        name: "Multilingual Text Analysis",
        pi: "Dr. Md. Shad Akhtar",
        funding: "MHRD",
        duration: "2022-2025",
      },
      {
        name: "Conversational AI for Indian Languages",
        pi: "Dr. Rajiv Ratn Shah",
        funding: "MeitY",
        duration: "2021-2024",
      },
      {
        name: "Sentiment Analysis for Social Media",
        pi: "Dr. Tanmoy Chakraborty",
        funding: "DST",
        duration: "2023-2026",
      },
    ],
  },
];

const focusAreas = [
  {
    title: "Identifying Commercially Viable Research",
    description:
      "We evaluate and identify research projects with strong commercial potential, helping researchers understand market opportunities.",
    icon: Lightbulb,
  },
  {
    title: "Fostering Industry Collaboration",
    description:
      "We connect researchers with industry partners to create meaningful partnerships and drive innovation.",
    icon: Business,
  },
  {
    title: "Supporting IP Protection",
    description:
      "We guide researchers through the process of protecting their intellectual property and maintaining their rights.",
    icon: Shield,
  },
  {
    title: "Enabling Startups and Spin-offs",
    description:
      "We provide support and resources for researchers looking to create startup companies from their innovations.",
    icon: Rocket,
  },
];

const rdInitiatives = [
  {
    title: "Cross-Sector Collaboration",
    description:
      "We actively encourage collaborations between researchers and industry leaders, ensuring research aligns with market needs.",
    icon: People,
  },
  {
    title: "Innovation Ecosystem",
    description:
      "Supporting the development of a thriving innovation ecosystem where researchers and entrepreneurs collaborate.",
    icon: Lightbulb,
  },
  {
    title: "Commercialization Pathways",
    description:
      "Guiding researchers through the commercialization process, from patents to industry partnerships.",
    icon: Business,
  },
];

const quickActions = [
  {
    title: "Research Proposals",
    description: "Submit your research proposals for funding and support",
    icon: Description,
  },
  {
    title: "Industry Connect",
    description: "Connect with industry partners for collaborative research",
    icon: Business,
  },
  {
    title: "IP Registration",
    description: "Register and protect your intellectual property",
    icon: Shield,
  },
  {
    title: "Research Grants",
    description: "Apply for various research grants and funding opportunities",
    icon: Rocket,
  },
];

const services = [
  {
    title: "Workshops",
    description:
      "Dive into fun workshops! From making new tech work to learning about protecting your ideas, we make innovation a blast for everyone.",
    icon: CalendarMonth,
  },
  {
    title: "Innovation Events",
    description:
      "Don't miss our cool events! From hackathons to showcases, it's your chance to shine and meet other creative minds.",
    icon: Groups,
  },
  {
    title: "Talk to Experts",
    description:
      "Got an idea? Chat one-on-one with our experts. We'll guide you on how to solve problems, polish your idea, and make it stand out.",
    icon: Message,
  },
  {
    title: "Meet Industry Players",
    description:
      "We help you meet the big players in the industry. A great chance to find a partner, start a joint project, or get your idea licensed.",
    icon: Business,
  },
];

const OurResearch = () => {
  return (
    <>
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="overline" className="service-label">
              RESEARCH AT IIITD
            </Typography>
            <Typography variant="h1" className="hero-title">
              Our Research
            </Typography>
            <Typography variant="body1" className="hero-description">
              We pioneer innovative solutions through advanced research. By
              leveraging cutting-edge technology, we develop impactful
              advancements. Our interdisciplinary collaboration drives progress
              across diverse fields.
            </Typography>
            <Box className="hero-buttons">
              <a href={Schedule_meet_link} target="_blank" rel="noreferrer">
                <Button className="contained" color="primary" size="large">
                  Schedule a Meeting
                </Button>
              </a>
              <a href="./Event">
                <Button className="outlined" size="large">
                  View Upcoming Events
                </Button>
              </a>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: "20px" }}>
        <Grid container spacing={3}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={service.title}>
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

        <Box sx={{ mb: "48px", mt: "48px" }}>
          <SectionTitle variant="h4">Research Areas</SectionTitle>
          <Box>
            {researchAreas.map((area, index) => (
              <StyledAccordion key={index}>
                <AccordionHeader expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{area.title}</Typography>
                </AccordionHeader>
                <AccordionDetails sx={{ p: 0 }}>
                  <TableContainer component={Paper} elevation={0}>
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{ backgroundColor: "rgba(37, 144, 132, 0.05)" }}
                        >
                          <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                            Researcher
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Research Focus
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {area.researchers.map((researcher, idx) => (
                          <TableRow
                            key={idx}
                            sx={{
                              "&:nth-of-type(odd)": {
                                backgroundColor: "rgba(0, 0, 0, 0.02)",
                              },
                            }}
                          >
                            <TableCell sx={{ fontWeight: 500 }}>
                              {researcher.name}
                            </TableCell>
                            <TableCell>{researcher.research}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: "48px" }}>
          <SectionTitle variant="h4">Research Projects</SectionTitle>
          <Box>
            {researchProjects.map((category, index) => (
              <StyledAccordion key={index}>
                <AccordionHeader expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{category.title}</Typography>
                </AccordionHeader>
                <AccordionDetails sx={{ p: 0 }}>
                  <TableContainer component={Paper} elevation={0}>
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{ backgroundColor: "rgba(37, 144, 132, 0.05)" }}
                        >
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Project Name
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Principal Investigator
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {category.projects.map((project, idx) => (
                          <TableRow
                            key={idx}
                            sx={{
                              "&:nth-of-type(odd)": {
                                backgroundColor: "rgba(0, 0, 0, 0.02)",
                              },
                            }}
                          >
                            <TableCell>{project.name}</TableCell>
                            <TableCell>{project.pi}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: "48px" }}>
          <SectionTitle variant="h4" sx={{ mb: "24px", textAlign: "left" }}>
            Ongoing R&D Initiatives
          </SectionTitle>
          <Grid container spacing={4}>
            {rdInitiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <Grid item xs={12} md={4} key={index}>
                  <Box
                    sx={{
                      p: 3,
                      backgroundColor: "rgba(37, 144, 132, 0.05)",
                      borderRadius: 2,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                      },
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        backgroundColor: "rgba(37, 144, 132, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                      }}
                    >
                      <Icon fontSize="large" sx={{ color: "#259084" }} />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {initiative.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {initiative.description}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>

      <Box sx={{ mt: 8, py: 8, backgroundColor: "#00B2B2", color: "white" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", px: { xs: 2, md: 4 } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontSize: { xs: "2.2rem", md: "3rem" },
              }}
            >
              Ready to Take the Next Step?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: 700,
                mx: "auto",
                mb: 4,
                fontWeight: 300,
              }}
            >
              Whether you want to protect an idea, license a technology, or
              collaborate on a groundbreaking project, our team is here to guide
              you. Let's build the future together.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                href={Schedule_meet_link}
                target="_blank"
                rel="noreferrer"
                sx={{
                  bgcolor: "white",
                  color: "#00B2B2",
                  py: 1.5,
                  px: 4,
                  fontSize: "1rem",
                  "&:hover": { bgcolor: "#e0f7fa" },
                }}
              >
                Schedule a Consultation
              </Button>
              <Button
                variant="outlined"
                href="../Explore_Technologies"
                sx={{
                  borderColor: "white",
                  color: "white",
                  py: 1.5,
                  px: 4,
                  fontSize: "1rem",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                Explore Our Work
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OurResearch;

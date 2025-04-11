import { Box, Container, Grid, Typography, Link, IconButton, Divider } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import "./component.css"

function SiteFooter() {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4} className="footer-content">
          {/* About Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading">
              About Us
            </Typography>
            <Typography variant="body2" className="footer-text">
              We facilitate innovation and technology transfer through strategic partnerships and commercialization
              support.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading">
              Quick Links
            </Typography>
            <Box className="footer-links">
              <Link href="../Services/Facilitate_Innovation">Our Services</Link>
              <Link href="../Our_Technology">Technology</Link>
              <Link href="../Resources/Faculty">Resources</Link>
              <Link href="../Event">Events</Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading">
              Contact
            </Typography>
            <Box className="footer-contact">
              <Typography variant="body2">Email: alok@iiitd.ac.in</Typography>
              <Typography variant="body2">Phone: 011 - 26907550</Typography>
              <Typography variant="body2">Address: A-303, Academic Building, IIITD, Okhla Industrial Estate, Phase III</Typography>
            </Box>
          </Grid>

          {/* Follow Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading">
              Follow Us
            </Typography>
            <Box className="social-icons">
              <IconButton aria-label="Facebook" className="social-icon">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" className="social-icon">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" className="social-icon">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      <Divider />
        {/* Bottom Bar */}
        <Box className="footer-bottom">
          <Typography variant="body2" className="copyright">
            © 2025 Technology Management Office. All rights reserved.
          </Typography>
          <Box className="bottom-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default SiteFooter;

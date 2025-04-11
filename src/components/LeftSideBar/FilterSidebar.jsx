import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

const FilterSidebar = ({ selectedGenres, handleGenreChange }) => {

  // Define available genres
  const genreOptions = ["AI", "Biotech", "IoT", "Cybersecurity", "Cloud Computing"];
  
  return (
    <Box className="filter-sidebar" sx={{
      borderRadius: '1px',
      bgcolor: 'white',
      border: '1px solid black',
      overflow: 'hidden',
    }}>
      <Typography variant="h6" gutterBottom sx={{ 
        fontWeight: 'bold', 
        textAlign: 'left', 
        color: '#333', 
        padding: '10px 16px', 
        bgcolor: '#f8f8f8',
        borderBottom: '2px solid black'
        
      }}>
        Filter by Genre
      </Typography>
      <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingLeft: '16px', marginBottom: '15px' }}>
        {genreOptions.map((genre) => (
          <FormControlLabel
            key={genre}
            control={
              <Checkbox
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
                icon={
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      border: "2px solid black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ width: 8, height: 8 }} />
                  </Box>
                }
                checkedIcon={
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      border: "2px solid black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ width: 8, height: 8, bgcolor: "black" }} />
                  </Box>
                }
              />
            }
            label={
              <Typography sx={{ color: '#333', fontWeight: 500 }}>{genre}</Typography>
            }
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default FilterSidebar;

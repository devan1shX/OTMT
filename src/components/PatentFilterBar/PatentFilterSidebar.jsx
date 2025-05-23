// src/components/PatentFilterSidebar/PatentFilterSidebar.js
import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// Define patent statuses - ensure these match the values stored in your technology data
const PATENT_STATUS_OPTIONS = [
  "Not Filed",
  "Application Filed",
  "Under Examination",
  "Granted",
  "Abandoned/Lapsed",
];

const PatentFilterSidebar = ({ selectedPatentStatuses, handlePatentStatusChange }) => {
  return (
    <Box className="patent-filter-sidebar" sx={{
      borderRadius: '1px', // Consistent with FilterSidebar
      bgcolor: 'white', // Consistent with FilterSidebar
      border: '1px solid black', // Consistent with FilterSidebar
      overflow: 'hidden',
      mb: 2, // Add some margin if placed above another sidebar
    }}>
      <Typography variant="h6" gutterBottom sx={{
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#333',
        padding: '10px 16px',
        bgcolor: '#f8f8f8', // Consistent header style
        borderBottom: '2px solid black' // Consistent header style
      }}>
        Filter by Patent Status
      </Typography>
      <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingLeft: '16px', paddingBottom: '15px', paddingTop: '10px' }}>
        {PATENT_STATUS_OPTIONS.map((status) => (
          <FormControlLabel
            key={status}
            control={
              <Checkbox
                checked={selectedPatentStatuses.includes(status)}
                onChange={() => handlePatentStatusChange(status)}
                icon={
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      border: "2px solid black", // Custom checkbox style
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
                      border: "2px solid black", // Custom checkbox style
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
              <Typography sx={{ color: '#333', fontWeight: 500 }}>{status}</Typography>
            }
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default PatentFilterSidebar;
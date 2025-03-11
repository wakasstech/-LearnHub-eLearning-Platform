import React, { useState, useEffect } from "react";
import {
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Link
} from "@mui/material";
import { ExpandMoreOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  fetchFilterCourses,
  fetchCourses,
   clearCourses
} from "../../../globalStore/Slices/CoursesSlice";
import { useSearchParams } from "react-router-dom";

const RenderSideCoursesFilters = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [expanded, setExpanded] = useState(["ratings", "subcategories_queries"]);
  const [selectedFilters, setSelectedFilters] = useState({
    ratings: [],
    subcategories_queries: [],
  });

  useEffect(() => {
    const filters = Object.fromEntries([...searchParams.entries()]);
    const initialFilters = {
      ratings: filters.ratings ? filters.ratings.split(",").map(Number) : [],
      subcategories_queries: filters.subcategories_queries ? filters.subcategories_queries.split(",") : [],
    };
    setSelectedFilters(initialFilters);
  }, [searchParams]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(prevExpanded =>
      isExpanded ? [...prevExpanded, panel] : prevExpanded.filter(p => p !== panel)
    );
  };

  const handleFilterChange = (category, value) => {
    const updatedFilters = { ...selectedFilters };
    if (category === "ratings") {
      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = [];
      } else {
        updatedFilters[category] = [value];
      }
    } else {
      if (updatedFilters[category]?.includes(value)) {
        updatedFilters[category] = updatedFilters[category]?.filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[category] = [...(updatedFilters[category] || []), value];
      }
    }

    setSelectedFilters(updatedFilters);

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(updatedFilters)) {
      if (Array.isArray(value) && value.length > 0) {
        params.append(key, value.join(","));
      } else if (value !== null && value !== undefined && value.length > 0) {
        params.append(key, value);
      }
    }

    const queryString = params.toString();
    dispatch(fetchFilterCourses(queryString));
    window.history.replaceState(null, "", `?${queryString}`);
  };
  
      
  const handleClearFilters = () => {
    const searchCoursesIdLocalStorage = localStorage.getItem('searchCoursesId');
    const typeLocalStorage = localStorage.getItem('type');
    setSelectedFilters({
      ratings: [],
      subcategories_queries: [],
    });
    setSearchParams({});
    dispatch(clearCourses());
    // dispatch(fetchFilterCourses(""));
    if(searchCoursesIdLocalStorage && typeLocalStorage )
      {
       
        dispatch(fetchCourses({ searchCoursesId: searchCoursesIdLocalStorage, type: typeLocalStorage }));
      }
    
  };

  return (
    <div className="filters">
      <Typography variant="h6" mb={1}>Filters</Typography>
      <Box display="flex" justifyContent="flex-end"  mb={2}>

      <Link
          component="button"
          variant="body2"
          onClick={handleClearFilters}
          sx={{ textDecoration: "underline", cursor: "pointer" }}
        >
          Clear Filters
        </Link>
        </Box>
      <Box mb={2}>
        <Accordion
          expanded={expanded.includes("ratings")}
          onChange={handleAccordionChange("ratings")}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography>Ratings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <FormControlLabel
                  key={rating}
                  control={
                    <Checkbox
                      checked={selectedFilters.ratings.includes(rating)}
                      onChange={() => handleFilterChange("ratings", rating)}
                    />
                  }
                  label={`${rating} & up`}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box mb={2}>
        <Accordion
          expanded={expanded.includes("subcategories_queries")}
          onChange={handleAccordionChange("subcategories_queries")}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography>Subcategory</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {["my own subcategory", "category", "React", "Node.js"].map(
                (subcategories_queries) => (
                  <FormControlLabel
                    key={subcategories_queries}
                    control={
                      <Checkbox
                        checked={selectedFilters.subcategories_queries.includes(
                          subcategories_queries
                        )}
                        onChange={() =>
                          handleFilterChange("subcategories_queries", subcategories_queries)
                        }
                      />
                    }
                    label={subcategories_queries}
                  />
                )
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
     
    </div>
  );
};

export default RenderSideCoursesFilters;

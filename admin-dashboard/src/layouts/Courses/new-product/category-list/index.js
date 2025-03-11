/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useLocation } from "react-router-dom";

// @mui material components



// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "globalStore/Slices/categoriesSlice";
import { useSelector } from "react-redux";
import createDataTableData from "./data/dataTableData";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import ArgonProgress from "components/ArgonProgress";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Button,
  Grid,
  CircularProgress,
  Modal,
  TextField,
  Box,
  Stack,
Paper

} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Edit } from "@mui/icons-material";
import CourseCard from "./components/CourseCard/CourseCard";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from '../../../../axios/axios';

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CourseModal from "./components/CourseModal/CourseModal";
import { fetchCourses } from "globalStoreApp/Slices/CoursesSlice";
 import { fetchCoursesInitial } from "globalStoreApp/Slices/CoursesSlice";
 import "./Courses.css";



function CategoriesList() {


  
  const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";
  const location = useLocation();
  const dispatch = useDispatch();

  const { searchCoursesId, type } = location.state || {}; // Destructure state from location
  
  // console.log("here in courses page", searchCoursesId);
  const { courses, loading, error } = useSelector((state) => state.courses);

  console.log("courses page", courses);
  // const isMaxScreen = useMediaQuery("(min-width: 1080px)");
  const [isCoursesModalVisible, setIsCoursesModalVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    if (searchCoursesId && type) {
      dispatch(fetchCourses({ searchCoursesId, type }));
    } else {
      dispatch(fetchCoursesInitial())
    }
  }, [dispatch, searchCoursesId, type]);
  // useEffect(() => {
  //   console.log("Dispatching fetchCoursesInitial");
  //   dispatch(fetchCoursesInitial()); // Call the action creator here
  // }, [dispatch]);

  const handleEditCourse = (course) => {
    setIsAddMode(false);
    setCurrentCourse(course);
    setIsCoursesModalVisible(true);
  };

  const handleAddCourse = () => {
    setIsAddMode(true);
    setCurrentCourse(null);
    setIsCoursesModalVisible(true);
  };

  return (
    <DashboardLayout
    sx={{
      backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
        `${linearGradient(
          rgba(gradients.info.main, 0.6),
          rgba(gradients.info.state, 0.6)
        )}, url(${bgImage})`,
      backgroundPositionY: "50%",
    }}
  >      <DashboardNavbar />
      <ArgonBox my={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="bold">
                All Courses
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              {/* {categories.length > 0 && (
                <>
                  <ArgonButton variant="gradient" color="error" size="small" onClick={handleDelete}>
                    Delete
                  </ArgonButton>
                  <ArgonButton variant="gradient" color="info" size="small" onClick={handleStatusUpdate}>
                    Update Status ▼
                  </ArgonButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={handleFileChangee} value="in_boycott">
                      in_boycott
                    </MenuItem>
                    <MenuItem onClick={handleStatusChange} value="questionable">
                      questionable
                    </MenuItem>
                  </Menu>
                </>
              )} */}
             
                
                 
              <Link to="/academy/categories-list">
                <ArgonButton variant="gradient" color="info" size="small">
                  See All Categories
                </ArgonButton>
              </Link>

              <ArgonButton onClick={handleAddCourse} variant="gradient" color="info" size="small">
                  Add Course
                </ArgonButton>
            </Stack>
          </ArgonBox>

    



    

          <div
      style={{
        
        padding: "15px",
        minHeight: "100vh",
      }}
    >
      {/* {loading ? (
        <LoadingSpinner  />
      ) : categories?.length > 0 ? (
        <Grid container spacing={3}>
       
        </Grid>
      ) : (
        <Typography
          sx={{
            color: "grey",
             fontSize: 16,
            paddingBottom: "20px",
            marginTop: 3,
            textAlign: "center",
            fontStyle: 'italic'
          }}
        >
          No courses found...
        </Typography>
      )} */}

<div className="main-container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0px 16px 0px 0px",
        }}
      >
        {/* <Button
          sx={{
            padding: "5px 9px",
            textTransform: "capitalize",
            background: "#0E162B",
          }}
          variant="contained"
          onClick={handleAddCourse}
        >
          Add Course
        </Button> */}
      </Box>
      {/* <div className="Course">
       
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error &&
              courses?.length === 0 &&
              error === "Request failed with status code 404" && (
                <p>Courses Not Found</p>
              )}
            {courses?.map((course, index) => (
              <Grid item key={index} >
                
                  <Paper
                    onClick={() => handleEditCourse(course)}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginBottom: 0.5,
                      boxShadow: "none",
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontStyle: "italic", fontSize:14 }}>
                      Edit
                    </span>
                    <Edit style={{ fontSize: "6px", marginLeft: 0.5,  }} />
                  </Paper>
                  <CourseCard {...course} />
                
              </Grid>
            ))}
          </Grid>
        </Grid>
        <CourseModal
          visible={isCoursesModalVisible}
          isAdd={isAddMode}
          onClose={() => setIsCoursesModalVisible(false)}
          course={currentCourse}
          type={type}
          searchCoursesId={searchCoursesId}
        />
      </div> */}

      <div className="Course">
  <Grid container spacing={2}>
    {error &&
      courses?.length === 0 &&
      error === "Request failed with status code 404" && (
        <Grid item xs={12}>
          <p>Courses Not Found</p>
        </Grid>
      )}
    {courses?.map((course, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}  >
        <Paper
                    onClick={() => handleEditCourse(course)}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginBottom: 0.5,
                      boxShadow: "none",
                     
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontStyle: "italic", fontSize:14 }}>
                      Edit
                    </span>
                    <Edit style={{ fontSize: "6px", marginLeft: 0.5,  }} />
                  </Paper>
                  <CourseCard {...course} />
      </Grid>
    ))}
  </Grid>
    <CourseModal
          visible={isCoursesModalVisible}
          isAdd={isAddMode}
          onClose={() => setIsCoursesModalVisible(false)}
          course={currentCourse}
          type={type}
          searchCoursesId={searchCoursesId}
        />
</div>

    </div>
      
   
    </div>

        </Card>

        <div>
      {/* Render the data table */}
      
      {/* Render the modal */}
     
    </div>
      </ArgonBox>
    </DashboardLayout>
  );
};


export default CategoriesList;
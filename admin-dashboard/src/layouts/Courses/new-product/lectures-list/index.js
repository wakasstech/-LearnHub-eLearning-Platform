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
Paper,
Chip

} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CalendarMonth, Edit, Money } from "@mui/icons-material";
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
import { fetchLectures } from "globalStoreApp/Slices/LecturesSlice";
import { fetchEnrollmentInfo } from "globalStoreApp/Slices/CoursesSlice";
import { styled } from "@mui/system";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Icon for duration
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // Icon for fee
import WorkIcon from "@mui/icons-material/Work"; // Icon for salary
import LockIcon from "@mui/icons-material/Lock"; // Icon for premium (paid)
import LockOpenIcon from "@mui/icons-material/LockOpen"; // Icon for free
import CourseEnrollmentTabComp from "./components/CourseEnrollmentTabComp/CourseEnrollmentTabComp";
import LectureCard from "./components/lecturesComponents/LectureCard";
import LectureModal from "./components/lecturesComponents/LectureModal";


function CategoriesList() {


  const CourseImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  });
  
  const MarqueeBox = styled("div")({
    backgroundColor: "#f5f5f5",
    color: "#333",
    padding: "8px 16px",
    borderRadius: "8px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    position: "relative",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "16px",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      width: "100%",
      height: "100%",
      animation: "marquee 5s linear infinite",
      background: "linear-gradient(to right, rgba(245, 245, 245, 0), rgba(245, 245, 245, 1))",
    },
    "@keyframes marquee": {
      from: { transform: "translateX(100%)" },
      to: { transform: "translateX(-100%)" },
    },
  });
  
  const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";
  const location = useLocation();
  const dispatch  = useDispatch();
  const { courseId } = location.state || {};
  console.log(courseId, 'course di')
  const [course, setCourse] = useState(null);

  const { lectures, loading, error } = useSelector((state) => state.lectures);

  const [isLectureModalVisible, setIsLectureModalVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const [currentLecture, setCurrentLecture] = useState(null);



  const fetchCourseInfo = async () => {
    try {
      const response = await axios.get(`/course/get-course?courseId=${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } 
    
    
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseInfo();
      dispatch(fetchLectures({ courseId }));
      dispatch(fetchEnrollmentInfo({ courseId }));
      // alert(courseId)
    }
  }, [dispatch, courseId]);




  const handleEditLecture = (lecture) => {
    setIsAddMode(false);
    setCurrentLecture(lecture);
    setIsLectureModalVisible(true);
  };
  const handleAddLecture = ( ) => {
    setIsAddMode(true);
    setCurrentLecture(null);
    setIsLectureModalVisible(true);
  };






  

 // Conditional rendering: Show loading message until course is fetched
 if (!course) {
  return (
    <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
      Loading course details...
    </Typography>
  );
}
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
              {/* <ArgonTypography variant="h5" fontWeight="bold"> */}
              <MarqueeBox>This course has professional teachers and is the best way to learn with practical hands on knowledge</MarqueeBox>

              {/* </ArgonTypography> */}
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
             
                
                 
              {/* <Link to="/product_managment/products/products-list">
                <ArgonButton variant="gradient" color="info" size="small">
                  See All Lectures
                </ArgonButton>
              </Link>

              <ArgonButton onClick={handleAddCourse} variant="gradient" color="info" size="small">
                  Add Course
                </ArgonButton> */}
            </Stack>
          </ArgonBox>

    

          <Box sx={{  backgroundColor: "#f5f5f5", minHeight: "100vh" }}>

          <Grid container spacing={4} alignItems="stretch">
        {/* Course Thumbnail */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", display: "flex" }}>
            <CourseImage src={course?.thumbnail_image} alt={course.course_name} />
          </Card>
        </Grid>

        {/* Course Details */} 
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 3 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                {course?.course_name}
              </Typography>

              {/* Premium Status */}
              <Chip
                icon={course?.is_premium ? <LockIcon /> : <LockOpenIcon />}
                label={course?.is_premium ? "Premium Course" : "Free Course"}
                color={course?.is_premium ? "secondary" : "success"}
                sx={{ marginBottom: 2 }}
              />

              {/* Details with Icons */}
              <Stack spacing={2} direction="row" alignItems="center" sx={{ marginTop: 2 }}>
                <CalendarMonth color="primary" />
                <Typography variant="h6" color="orangered">Duration: {course?.duration}</Typography>
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center" sx={{ marginTop: 1 }}>
                <Money color="secondary" />
                <Typography variant="h6">Fee: PKR {course?.course_fee}</Typography>
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center" sx={{ marginTop: 1 }}>
                <WorkIcon color="action" />
                <Typography variant="h6">Estimated Salary: PKR {course?.course_salary}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 6 }}>
        <Card sx={{ padding: 3, boxShadow: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center" sx={{ marginTop: 2 }}>
                <AccessTimeIcon color="primary" />
                <Typography variant="h6" color="orangered">Timing: {course?.course_timings}</Typography>
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center" sx={{ marginTop: 1 }}>
                
                <Typography variant="h6"><span style={{color:'blue'}}>Outline:</span> {course?.course_outline}</Typography>
              </Stack>
              
        </Card>
      </Box>
      {/* Additional Details Section */}
      <Box sx={{ marginTop: 6 }}>
        <Card sx={{ padding: 3, boxShadow: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Description
          </Typography>
          <Typography variant="body2" paragraph>
            {course?.course_description}
          </Typography>
        </Card>
      </Box>

          <div >
                {/* <div className="secTtl">Enroll Info</div> */}
                <div className="secBdy">
                  <CourseEnrollmentTabComp  />
                </div>
              </div>
    </Box>
    <Box sx={{ padding: "20px", justifyContent: "center", display: "flex" }}>
       <Typography gutterBottom variant="h3" fontWeight={800} component="div">
         Lectures <span style={{color: 'grey'}}>({lectures?.length})</span>
       </Typography>
     </Box>
    
    <Box sx={{padding: '0px 14px'}}>
     
     <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: '0px 16px 0px 0px'}}>
       {/* <Button sx={{padding: '5px 9px', textTransform :'capitalize', background: '#0E162B'}} variant="contained" onClick={handleAddLecture}>Add Lecture</Button> */}
      
       <ArgonButton onClick={handleAddLecture} variant="gradient" color="info" size="small">
                  Add Lecture
                </ArgonButton> 
       </Box>
      
     
     {error && lectures?.length === 0 && error === "Request failed with status code 404" && <p>Lectures Not Found</p>}
     <Grid container spacing={2} sx={{ padding: "20px", display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
     {lectures?.map((lecture, index) => (
       <Grid item key={index}>
          <Paper
                 onClick={() => handleEditLecture(lecture)}
                 sx={{
                   cursor: 'pointer',
                   display: 'flex',
                   justifyContent: 'flex-end',
                   alignItems: 'center',
                   marginBottom: 0.5,
                   boxShadow: 'none'
                 }}
               >
                 <span style={{ fontWeight: 'bold', fontStyle: 'italic' , fontSize: 13}}>Edit</span>
                 <Edit style={{ fontSize: '13px', marginLeft: 0.5 }} />
               </Paper>
         <LectureCard lecture={lecture} />
       </Grid>
     ))}
     <LectureModal
         visible={isLectureModalVisible}
         isAdd={isAddMode}
         onClose={() => setIsLectureModalVisible(false)}
         lecture={currentLecture}
         courseId={courseId}
       />
   </Grid>
   </Box>
        
        </Card>

      
      </ArgonBox>
    </DashboardLayout>
  );
};


export default CategoriesList;
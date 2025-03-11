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
import { Link, useLocation, useNavigate } from "react-router-dom";

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
Chip,
Divider

} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AddBoxOutlined, Edit } from "@mui/icons-material";
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
import { fetchVideos } from "globalStoreApp/Slices/videoSlice";
import UploadVideo from "./components/UploadVideo/UploadVideo";
import Videos from "./components/Videos/Videos";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // MUI back arrow icon


function CategoriesList() {

  const navigate = useNavigate(); // Initialize the navigation hook

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page in history
  };
  
  const MarqueeBox = styled("div")({
    backgroundColor: "#f5f5f5",
    color: "orangered",
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
  const { lectureId } = location.state || {};

  const dispatch  = useDispatch();

  const { userVideos, loading, error } = useSelector((state) => state.videos);
  console.log(userVideos?.Videos, 'global store videos');


  useEffect(() => {

    dispatch(fetchVideos({ lectureId }));
  }, [dispatch]);



  

 // Conditional rendering: Show loading message until course is fetched
 if (userVideos?.length > 0) {
  return (
    <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
      Loading lecture videos...
    </Typography>
  );
}
const backgroundImageUrl = "https://t3.ftcdn.net/jpg/06/63/91/96/360_F_663919636_FtMMuUWMWlN0WWq6iTT7tl3gMoTv25hL.jpg";
const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: theme.spacing(4),
  // textAlign: 'center',
  marginBottom: theme.spacing(4),
  height: "240px", // Adjust height as needed
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

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
        <Box sx={{marginLeft: 2, marginTop: 2.5}}>
            <div style={{fontSize: '25px', cursor: 'pointer'}}>
              <ArrowBackIcon       onClick={handleBack}
 style={{ color: 'white',   backgroundColor: '#368FE3', borderRadius: 20 }} />

            </div>
      
</Box>

          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              {/* <ArgonTypography variant="h5" fontWeight="bold"> */}
              <MarqueeBox>Learn Anytime Anywhere Discover Tailored Courses Backed by Solid References and Expert Insights</MarqueeBox>

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
          <BackgroundContainer>
    <div style={{
  fontSize: 24,
  fontWeight: 900,
  color: '#e3e0ce'
}}>
      <h1>{userVideos?.lecture_name}</h1>
    </div>
    {/* <Typography variant="h6">Welcome to Thapa Technical. This channel is all about Website Development, Technical Tips and Tricks, and more!</Typography> */}
  </BackgroundContainer>

  <Box sx={{ marginTop: 0,marginBottom:2, px:3 }}>
        <Card sx={{ padding: 3, boxShadow: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center" sx={{ marginTop: 2 }}>
                
                <Typography fontSize={16} ><span style={{color: 'grey'}}>Description:</span> {userVideos?.lecture_description}</Typography>
              </Stack>
              {/* <Stack spacing={2} direction="row" alignItems="center" sx={{ marginTop: 1 }}>
                
                <Typography variant="h6"><span style={{color:'grey'}}>Outline:</span> sadsad</Typography>
              </Stack> */}
              
        </Card>
      </Box>
      <Divider variant="middle" sx={{marginBottom: 2, marginTop: 0}}/>

          <Stack>
      <Box  sx={{ 
        overflowY: "auto", height: "90vh", flex: 2,  
        padding: { xs: "10px 13px",md: "15px 50px"}
              }} >
        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom:10}}>
        <UploadVideo lectureID={lectureId} loading={loading} />
        </div>
     
        <h3 style={{textAlign: 'center', padding: '0px 0px 20px 0px', textDecoration: 'underline'}}> Lecture Videos</h3>
        <Videos  videos={userVideos?.Videos}/>
    
      </Box>
    </Stack>

         
        
        </Card>

      
      </ArgonBox>
    </DashboardLayout>
  );
};


export default CategoriesList;
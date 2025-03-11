import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import "./Lectures.css";
import LectureCard from "./components/LectureCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchLectures } from "../../globalStore/Slices/LecturesSlice";
import { Edit } from "@mui/icons-material";
import LectureModal from "./components/LectureModal";

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cXVyYW58ZW58MHx8MHx8fDA%3D";

// const courses = [
//   {
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKKRZuKwS-ZE8q54VVRKMXg6IvtJXTpnzATsJpHH9YQ&s",
//     title: "The Complete 2024 Web Development Bootcamp",
//     description:
//       "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
//     instructor: "Dr. Angela Yu",
//     rating: "4.7",
//     students: "377,938",
//     price: "$9.99",
//     originalPrice: "$74.99",
//   },
//   {
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKKRZuKwS-ZE8q54VVRKMXg6IvtJXTpnzATsJpHH9YQ&s",
//     title: "The Web Developer Bootcamp 2024",
//     description:
//       "10 Hours of React just added. Become a Developer With ONE course - HTML, CSS, JavaScript, React, Node, MongoDB and More!",
//     instructor: "Colt Steele",
//     rating: "4.7",
//     students: "272,327",
//     price: "$9.99",
//     originalPrice: "$74.99",
//   },
//   {
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKKRZuKwS-ZE8q54VVRKMXg6IvtJXTpnzATsJpHH9YQ&s",
//     title: "The Complete 2024 Web Development Bootcamp",
//     description:
//       "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
//     instructor: "Dr. Angela Yu",
//     rating: "4.7",
//     students: "377,938",
//     price: "$9.99",
//     originalPrice: "$74.99",
//   },
  
//   // Add more courses as needed...
// ];

const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: theme.spacing(4),
  // textAlign: 'center',
  marginBottom: theme.spacing(4),
  height: "300px", // Adjust height as needed
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));




const Lectures = () => {
  const location = useLocation();
  const { courseId, courseName } = location.state || {};

  console.log('course id in lectures', courseId, courseName)

  const { lectures, loading, error } = useSelector((state) => state.lectures);

  const [isLectureModalVisible, setIsLectureModalVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const [currentLecture, setCurrentLecture] = useState(null);


const dispatch = useDispatch();

  useEffect(() => {
    if (courseId) {
      dispatch(fetchLectures({ courseId }));
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


  return (
    <>
    <BackgroundContainer>
    <div class="shine">
      <h1>{courseName}</h1>
    </div>
    {/* <Typography variant="h6">Welcome to Thapa Technical. This channel is all about Website Development, Technical Tips and Tricks, and more!</Typography> */}
  </BackgroundContainer>
    <Box sx={{padding: '0px 14px'}}>
     
      <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: '0px 16px 0px 0px'}}>
        <Button sx={{padding: '5px 9px', textTransform :'capitalize', background: '#0E162B'}} variant="contained" onClick={handleAddLecture}>Add Lecture</Button>
        </Box>
      <Box sx={{ padding: "20px", justifyContent: "center", display: "flex" }}>
        <Typography gutterBottom variant="h5" fontWeight={800} component="div">
          Lectures
        </Typography>
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
                  <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Edit</span>
                  <Edit sx={{ fontSize: '14px', marginLeft: 0.5 }} />
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
    </>
  );
};

export default Lectures;

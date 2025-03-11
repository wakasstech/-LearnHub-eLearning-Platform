import React, { useEffect, useState } from "react";
import "./Courses.css";
import CourseCard from "./components/CourseCard";
import { Box,Button,Grid,Paper,useMediaQuery} from "@mui/material";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchCourses, fetchFilterCourses, setFilters } from "../../globalStore/Slices/CoursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "@mui/icons-material";
import CourseModal from "./components/CourseModal";
import RenderSideCoursesFilters from "./components/RenderSideCoursesFilters";
import { AdminAccess } from "../../PermissionsChilds/AdminAccess";

const Courses = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { searchCoursesId, type } = location.state || {}; // Destructure state from location

  console.log("here in courses page",searchCoursesId )
  const { courses, loading, error } = useSelector((state) => state.courses);

  console.log('courses page', courses)
  const isMaxScreen = useMediaQuery("(min-width: 1080px)");
  const [isCoursesModalVisible, setIsCoursesModalVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    const filters = Object.fromEntries([...searchParams.entries()]);
    if (Object.keys(filters).length > 0) {
      dispatch(setFilters(filters)); // Set filters state in redux
      const queryString = searchParams.toString();
      dispatch(fetchFilterCourses(queryString));
      // setSelectedFilters(filters);
    } else  {

      dispatch(fetchCourses(searchCoursesId && type ? { searchCoursesId, type } : {}));
    }
  }, [dispatch, searchCoursesId, type, searchParams]);

  useEffect(() => {
    if (!searchParams.toString() && !searchCoursesId && !type) {
      const searchCoursesIdLocalStorage = localStorage.getItem('searchCoursesId');
    const typeLocalStorage = localStorage.getItem('type');
      dispatch(fetchCourses({ searchCoursesId: searchCoursesIdLocalStorage, type: typeLocalStorage }));
    }
  }, [dispatch, searchCoursesId, type, searchParams]);

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
    <div className="main-container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0px 16px 0px 0px",
        }}
      >
<AdminAccess dispatch={dispatch}>

        <Button
          sx={{ padding: "5px 9px", textTransform: "capitalize", background: '#0E162B' }}
          variant="contained"
          onClick={handleAddCourse}
        >
          Add Course
        </Button>
        </AdminAccess>

      </Box>
      <div className="Course" >
        <h1>Courses</h1>
        <Grid container spacing={2} >
          {isMaxScreen && (
          <Grid item xs={12} sm={4} md={3}
          //  sx={{border: '1px solid #ddd',  marginTop: 5}}
           >
           <RenderSideCoursesFilters  />
          </Grid>
          )}
          <Grid item xs={12} md={isMaxScreen ? 9: 12}>
            {error &&
              courses?.length === 0 &&
              error === "Request failed with status code 404" && (
                <p>Courses Not Found</p>
              )}
            {courses?.map((course, index) => (
              <Grid item key={index}>
                <Box>
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
                    <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                      Edit
                    </span>
                    <Edit sx={{ fontSize: "14px", marginLeft: 0.5 }} />
                  </Paper>
                  <CourseCard {...course} />
                </Box>
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
      </div>
    </div>
  );
};

export default Courses;

// import React, { useEffect, useState } from "react";
// import "./Courses.css";
// import CourseCard from "./components/CourseCard";
// import { Box, Button, Grid, Paper, useMediaQuery } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import { fetchCourses } from "../../globalStore/Slices/CoursesSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { Edit } from "@mui/icons-material";
// import CourseModal from "./components/CourseModal";

// const Courses = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const { searchCoursesId, type } = location.state || {}; // Destructure state from location

//   console.log("here in courses page", searchCoursesId);
//   const { courses, loading, error } = useSelector((state) => state.courses);

//   console.log("courses page", courses);
//   const isMaxScreen = useMediaQuery("(min-width: 1080px)");
//   const [isCoursesModalVisible, setIsCoursesModalVisible] = useState(false);
//   const [isAddMode, setIsAddMode] = useState(true);
//   const [currentCourse, setCurrentCourse] = useState(null);

//   // useEffect(() => {
//   //   if (searchCoursesId && type) {
//   //     dispatch(fetchCourses({ searchCoursesId, type }));
//   //   } 
//   // }, [dispatch, searchCoursesId, type]);
//   useEffect(() => {
//     dispatch(fetchCourses(searchCoursesId && type ? { searchCoursesId, type } : {}));
//   }, [dispatch, searchCoursesId, type]);

//   const handleEditCourse = (course) => {
//     setIsAddMode(false);
//     setCurrentCourse(course);
//     setIsCoursesModalVisible(true);
//   };

//   const handleAddCourse = () => {
//     setIsAddMode(true);
//     setCurrentCourse(null);
//     setIsCoursesModalVisible(true);
//   };

//   return (
//     <div className="main-container">
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           padding: "0px 16px 0px 0px",
//         }}
//       >
//         <Button
//           sx={{
//             padding: "5px 9px",
//             textTransform: "capitalize",
//             background: "#0E162B",
//           }}
//           variant="contained"
//           onClick={handleAddCourse}
//         >
//           Add Course
//         </Button>
//       </Box>
//       <div className="Course">
//         <h1>Courses</h1>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             {error &&
//               courses?.length === 0 &&
//               error === "Request failed with status code 404" && (
//                 <p>Courses Not Found</p>
//               )}
//             {courses?.map((course, index) => (
//               <Grid item key={index} >
//                 <Box>
//                   <Paper
//                     onClick={() => handleEditCourse(course)}
//                     sx={{
//                       cursor: "pointer",
//                       display: "flex",
//                       justifyContent: "flex-end",
//                       alignItems: "center",
//                       marginBottom: 0.5,
//                       boxShadow: "none",
//                     }}
//                   >
//                     <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
//                       Edit
//                     </span>
//                     <Edit sx={{ fontSize: "14px", marginLeft: 0.5 }} />
//                   </Paper>
//                   <CourseCard {...course} />
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//         <CourseModal
//           visible={isCoursesModalVisible}
//           isAdd={isAddMode}
//           onClose={() => setIsCoursesModalVisible(false)}
//           course={currentCourse}
//           type={type}
//           searchCoursesId={searchCoursesId}
//         />
//       </div>
//     </div>
//   );
// };

// export default Courses;

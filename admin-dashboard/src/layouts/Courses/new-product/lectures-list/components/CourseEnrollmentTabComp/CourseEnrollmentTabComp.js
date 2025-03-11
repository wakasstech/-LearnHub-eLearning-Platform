import React from "react";
import { useSelector } from "react-redux";
import axios from "../../../../../../axios/axios"
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import Swal from "sweetalert2";
import { fetchEnrollmentInfo } from "globalStoreApp/Slices/CoursesSlice";
import { useDispatch } from "react-redux";

const CourseEnrollmentTabComp = () => {
  const dispatch = useDispatch();
  const { enrollStudents, enrollTeachers } = useSelector(
    (state) => state.courses
  );
  const handleApprove = (enrollId, courseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this enrollment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put("enrollment/approve", { enrollment_id:  enrollId})
          .then(() => {
            
            Swal.fire("Approved!", "Enrollment approved successfully.", "success");
                   dispatch(fetchEnrollmentInfo({ courseId }));

          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong. Please try again.", "error");
            console.error("Approval Error:", error);
          });
      }
    });
  };
  return (
    <Box sx={{ padding: 1 }}>
      {/* Students Section */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Students <Chip label={enrollStudents?.length || 0} color="primary" />
        </Typography>
        <Card>
          <CardContent>
            {enrollStudents?.length > 0 ? (
              <List>
                {enrollStudents.map((student) => (
                  <ListItem key={student.id} sx={{ display: "block", mb: 2 }}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          style={{fontSize: 13}}
                        >
                          <strong style={{fontSize: 13}}>Name</strong>{" "}{student.username}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography style={{fontSize: 13}}>
                            <strong style={{fontSize: 13}}>Enrollment Date:</strong>{" "}
                            {new Date(
                              student.enrollment_date
                            ).toLocaleDateString()}
                          </Typography>
                          <Typography style={{fontSize: 13}}>
                            <strong style={{fontSize: 13}}>Approval Status:</strong>{" "}
                            {student.approved ? "Approved" : "Pending"}
                            
                          </Typography>
                          <div
  style={{
    padding: "5px",
    borderRadius: "5px",
    background: student.approved ? "#e0f7fa" : "#fff3e0", // Light blue for approved, light orange for pending
    border: student.approved ? "1px solid #00796b" : "1px solid #ff9800",
    color: student.approved ? "#00796b" : "#ff9800",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "5px",
    fontSize:12,
    marginBottom:6
  }}
>
  {student.approved ? (
    <>
      {/* ✅ <strong>Approved</strong>: You now have full access to the course content, including lectures, videos, and materials. Enjoy your learning journey! 📚🎥 */}
      ✅ <strong>Approved</strong>: This student has access to the course, including all lectures, video lessons, and study materials 📚🎥

    </>
  ) : (
    <>
      {/* ⏳ <strong>Pending Approval</strong>: Once approved by the admin, you will gain access to the course lectures, video lessons, and study materials. Stay tuned! 🎓 */}
          ⏳ <strong>Pending Approval</strong>: This student is waiting for access. Once approved, they will be able to view course lectures🎓

    </>
  )}
</div>

                          {student.approved ? 
                           <button style={{
                            background: student.approved ? "grey" : "orange",
                            
                              border: student.approved ? '1px solid grey' : '1px solid orange', padding:4, color: 'white',
                            borderRadius:3
                           }} disabled
                           >Remove</button>
                          
                            : 
                            <button style={{background: 'orange',cursor:'pointer', border: '1px solid orange', padding:4, color: 'white',  borderRadius:3}}
                            onClick={() => handleApprove(student.id, student.course_id)}
                            >Approve</button>
                            }
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No students enrolled yet.</Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Teachers Section */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Teachers <Chip label={enrollTeachers?.length || 0} color="secondary" />
        </Typography>
        <Card>
          <CardContent>
            {enrollTeachers?.length > 0 ? (
              <List>
                {enrollTeachers.map((teacher) => (
                  <ListItem key={teacher.id} sx={{ display: "block", mb: 2 }}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          style={{fontSize: 13}}
                        >
                                                    <strong style={{fontSize: 13}}>Name</strong>{" "}{teacher.username}

                       
                        </Typography>
                        
                      }
                      secondary={
                        <>
                          <Typography style={{fontSize: 13}}>
                            <strong style={{fontSize: 13}}>Enrollment Date:</strong>{" "}
                            {new Date(
                              teacher.enrollment_date
                            ).toLocaleDateString()}
                          </Typography>
                          <Typography style={{fontSize: 13}}>
                            <strong style={{fontSize: 13}}>Approval Status:</strong>{" "}
                            {teacher.approved ? "Approved" : "Pending"}
                          </Typography>
                               <div
  style={{
    padding: "5px",
    borderRadius: "5px",
    background: teacher.approved ? "#e0f7fa" : "#fff3e0", // Light blue for approved, light orange for pending
    border: teacher.approved ? "1px solid #00796b" : "1px solid #ff9800",
    color: teacher.approved ? "#00796b" : "#ff9800",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "5px",
    fontSize:12,
    marginBottom:6
  }}
>
                          {teacher.approved ? ( 
  <>
    ✅ <strong>Approved</strong>: This teacher is authorized to teach and manage courses, including lectures, video lessons, and study materials 📚🎥
  </>
) : (
  <>
    ⏳ <strong>Pending Approval</strong>: This teacher is awaiting admin approval. Once approved, they will be able to create and manage course content 🎓
  </>
)}
</div>
                          {teacher.approved ? 
                           <button style={{background: 'orange',  border: '1px solid orange', padding:4, color: 'white',  borderRadius:3}}
                           >Remove</button>
                          
                            : 
                            <button style={{background: 'orange', border: '1px solid orange', padding:4, color: 'white',  borderRadius:3}}
                            onClick={() => handleApprove(teacher.id, teacher.course_id)}>Approve</button>
                            }
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No teachers enrolled yet.</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CourseEnrollmentTabComp;

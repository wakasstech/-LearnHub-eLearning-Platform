import React from "react";
import { useSelector } from "react-redux";
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

const CourseEnrollmentTabComp = () => {
  const { enrollStudents, enrollTeachers } = useSelector(
    (state) => state.courses
  );

  return (
    <Box sx={{ padding: 3 }}>
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
                          sx={{ fontWeight: "bold" }}
                        >
                          Name: {student.username}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography>
                            <strong>Enrollment Date:</strong>{" "}
                            {new Date(
                              student.enrollment_date
                            ).toLocaleDateString()}
                          </Typography>
                          <Typography>
                            <strong>Approval Status:</strong>{" "}
                            {student.approved ? "Approved" : "Pending"}
                          </Typography>
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
                          sx={{ fontWeight: "bold" }}
                        >
                          Name: {teacher.username}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography>
                            <strong>Enrollment Date:</strong>{" "}
                            {new Date(
                              teacher.enrollment_date
                            ).toLocaleDateString()}
                          </Typography>
                          <Typography>
                            <strong>Approval Status:</strong>{" "}
                            {teacher.approved ? "Approved" : "Pending"}
                          </Typography>
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

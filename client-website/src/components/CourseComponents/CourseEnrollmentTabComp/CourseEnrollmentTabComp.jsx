import React from "react";
import css from "./CourseEnrollmentTabComp.module.css";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";

const CourseEnrollmentTabComp = () => {
  const { enrollStudents, enrollTeachers } = useSelector(
    (state) => state.courses
  );

  return (
    <div className={css.container}>
      <div className={css.enrollmentList}>
        <h3 className={css.subHeader}>Students[{enrollStudents?.length}]</h3>

        <ul className={css.lecturesList}>
          {enrollStudents?.length > 0 &&
            enrollStudents.map((student) => (
              <li key={student.id} className={css.enrollmentItem}>
                <div className={css.titleColor}>
                  <strong className={css.titleStyle}>Name:</strong>{" "}
                  {student.username}
                </div>
                <div className={css.titleColor}>
                  <strong className={css.titleStyle}>Enrollment Date:</strong>{" "}
                  {new Date(student.enrollment_date).toLocaleDateString()}
                </div>
                <div className={css.titleColor}>
                  <strong className={css.titleStyle}>Approval Status:</strong>{" "}
                  {student.approved ? "Approved" : "Pending"}
                </div>
              </li>
            ))}
        </ul>

        <Divider sx={{ marginTop: 5, marginBottom: 4 }} />
        <h3 className={css.subHeader}>Teachers[{enrollTeachers?.length}]</h3>

        {enrollTeachers?.length > 0 &&
          enrollTeachers.map((teacher) => (
            <div key={teacher.id} className={css.enrollmentItem}>
              <div className={css.titleColor}>
                <strong className={css.titleStyle}>Name:</strong>{" "}
                {teacher.username}
              </div>
              <div className={css.titleColor}>
                <strong className={css.titleStyle}>Enrollment Date:</strong>{" "}
                {new Date(teacher.enrollment_date).toLocaleDateString()}
              </div>
              <div className={css.titleColor}>
                <strong className={css.titleStyle}>Approval Status:</strong>{" "}
                {teacher.approved ? "Approved" : "Pending"}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CourseEnrollmentTabComp;

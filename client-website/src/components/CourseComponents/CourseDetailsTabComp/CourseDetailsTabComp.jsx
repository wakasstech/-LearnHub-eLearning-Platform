import React from 'react';
import css from './CourseDetailsTabComp.module.css';

const CourseDetailsTabComp = ({ courseData }) => {
  const totalLectures = courseData.length;
  console.log(courseData, 'lectures of course');
  
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2>Total Lectures: {totalLectures}</h2>
      </div>
      <ul className={css.lecturesList}>
        {courseData.map((lecture) => (
          <li key={lecture.id} className={css.lectureItem}>
            <div className={css.lectureName}>{lecture.lecture_name}</div>
            <div className={css.videoCount}>{lecture.videos?.length} Videos</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetailsTabComp;
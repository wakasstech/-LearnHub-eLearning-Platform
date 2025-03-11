import { AccessTimeOutlined, AlarmOnRounded } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ thumbnail_image, course_name, course_description, duration, course_outline, course_timings, course_fee, id, is_premium}) => {
  const navigate = useNavigate();
  const [validImage, setValidImage] = useState(null);

  const handleCourseCard = () => {
    const courseData = {
      thumbnail_image,
      course_name,
      course_description,
      duration,
      course_outline,
      course_timings,
      course_fee,
      courseId: id,
      id,
      is_premium
    };
    navigate("/course_detail", {
      state:{
        courseId: id,
        completeInfo: courseData
      }
    });
  };

  const defaultCourseThumbs = [
    'https://media.istockphoto.com/id/1718890803/photo/close-up-of-holy-book-quran-at-mosque-sunlight-is-reflected-to-quran.webp?b=1&s=170667a&w=0&k=20&c=nZQ6tCRnxbK2dmQ5hHHoyKdCVumaiskPwNJZ0GPu_Uk=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZ5bRblqFICE4-f0gQNUxOkqzkDMChgH8Kg&s' ,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRVOteqWY1aIK721xRyOXj8G8ri8trrc88w&s'
  ];

  const getRandomDefaultImage = () => {
    return defaultCourseThumbs[Math.floor(Math.random() * defaultCourseThumbs.length)];
  };

  useEffect(() => {
    const validateImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    };

    const checkImage = async () => {
      const isValid = await validateImage(thumbnail_image);
      setValidImage(isValid ? thumbnail_image : getRandomDefaultImage());
    };

    checkImage();
  }, [thumbnail_image]);

  return (
    
    <div className="course-card" onClick={handleCourseCard}>
      <img src={validImage} alt="Course" className="course-image" />
      <div className="course-info">
        <h3 className="course-title">{course_name}</h3>
        <p className="course-description">{course_description}</p>
        <p className="course-instructor">{duration}</p>
        <div className="course-rating">
          <div className="time-info">
            <AccessTimeOutlined sx={{fontSize: 18, color: 'orangered'}}/>
            <span className="course-timmings">{course_timings}</span>
          </div>
        </div>
        <div className="course-pricing">
          <span className="course-price">{new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "PKR",
          }).format(course_fee)}</span>
          <span className="course-original-price">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "PKR",
            }).format(course_fee * 2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

import { AccessTimeOutlined, AlarmOnRounded } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import "../../Courses.css";
import { Box, Typography } from '@mui/material';


const CourseCard = ({
    id, 
    thumbnail_image,
    course_name,
    course_description,
    duration,
    course_fee,
  }) => {
    const [validImage, setValidImage] = useState(null);
  const navigate = useNavigate();
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
        setValidImage(
          isValid
            ? thumbnail_image
            : "https://via.placeholder.com/400?text=Course+Thumbnail"
        );
      };
  
      checkImage();
    }, [thumbnail_image]);

    const handleCourseCard = () => {
      navigate("/academy/course-detail", {
        state:{
          courseId: id,
        }
      });
    }
  
    return (
      <Box sx={{ display: "flex", flexDirection: "column", cursor: 'pointer' }} onClick={handleCourseCard}>
        <img
          src={validImage}
          alt="Course Thumbnail"
          style={{
            width: "100%",
            height: "140px",
            objectFit: "cover",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
           
          }}
        />
        <Box sx={{ padding: "16px", backgroundColor: "#fff" }}>
          <Typography variant="h6" fontWeight="bold" noWrap>
            {course_name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 1 }}
            noWrap
          >
            {course_description}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AccessTimeOutlined sx={{ fontSize: 16, color: "orangered" }} />
            <span style={{ marginLeft: 8 }}>{duration}</span>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#e74c3c",
              fontWeight: "bold",
              mt: 2,
            }}
          >
            PKR {course_fee?.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    );
  };
  

CourseCard.propTypes = {
    isSubcategory: PropTypes.bool,
    thumbnail_image: PropTypes.string,
    course_name: PropTypes.string,
    course_description: PropTypes.string,
    duration: PropTypes.string,
    course_outline: PropTypes.string,
    course_timings: PropTypes.string,
    course_fee: PropTypes.number,
    id: PropTypes.string,
    is_premium: PropTypes.bool
  };

export default CourseCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CourseCarouselComp.css";
import { NextArrow, PrevArrow } from "./CustomArrowCarousel/CustomArrow";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { AccessTimeOutlined } from "@mui/icons-material";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#f5f5f5",
    color: "#333",
    fontSize: "0.875rem",
    maxWidth: "300px",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "8px 4px 8px rgba(0, 0, 0, 0.9)",
    cursor: "pointer",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#f5f5f5",
  },
});

const TooltipContent = ({
  title,
  description,
  rating,
  duration,
  onRatingChange,
}) => (
  <Box>
    <p className="tooltip-description">{description}</p>
    <div className="card-rating" style={{ marginBottom: 10 }}>
      <span style={{ fontWeight: "bold" }}>Rating: </span> {rating || 4.5}
    </div>
    <span style={{ fontWeight: "bold" }}>Duration: </span> {duration}
  </Box>
);

const Carousel = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const defaultCourseThumbs = [
    "https://media.istockphoto.com/id/1718890803/photo/close-up-of-holy-book-quran-at-mosque-sunlight-is-reflected-to-quran.webp?b=1&s=170667a&w=0&k=20&c=nZQ6tCRnxbK2dmQ5hHHoyKdCVumaiskPwNJZ0GPu_Uk=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZ5bRblqFICE4-f0gQNUxOkqzkDMChgH8Kg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRVOteqWY1aIK721xRyOXj8G8ri8trrc88w&s",
  ];

  const getRandomDefaultImage = () => {
    return defaultCourseThumbs[
      Math.floor(Math.random() * defaultCourseThumbs.length)
    ];
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/course/getall-courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  // const handleRatingChange = (courseId, newRating) => {
  //   // Make an API call to update the rating
  //   axios.put(`http://localhost:8000/course/update-rating/${courseId}`, { rating: newRating })
  //     .then(response => {
  //       // Update the local state with the new rating
  //       setCourses(prevCourses =>
  //         prevCourses.map(course =>
  //           course.id === courseId ? { ...course, course_rating: newRating } : course
  //         )
  //       );
  //     })
  //     .catch(error => {
  //       console.error('Error updating rating:', error);
  //     });
  // };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleClickCourse = (course, event) => {
    event.preventDefault();
  
  
    navigate("/course_detail", {
      state: {
        courseId: course?.id,
        completeInfo: course,
      },
    });
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {courses.map((course) => (
          <div
            className="carousel-item"
            key={course.id}
            onClick={(event) => handleClickCourse(course, event)}
          >
            <CustomTooltip
              title={
                <TooltipContent
                  title={course.course_name}
                  description={course.course_description}
                  rating={course.course_rating || 4.5}
                  duration={course.duration || "2 months"}

                  // onRatingChange={(newRating) => handleRatingChange(course.id, newRating)}
                />
              }
              placement="top"
            >
              <Box
                sx={{
                  ":hover": {
                    boxShadow: 20,
                    opacity: 0.9,
                    cursor: "pointer",
                  },
                  border: '1px solid #c5c2c2',
                  borderRadius:' 10px'
                }}
              >
                <img
                  src={course.thumbnail_image || getRandomDefaultImage()}
                  alt={course.course_name}
                  onError={(e) => (e.target.src = getRandomDefaultImage())}
                />
                <div className="carousel-item-content" >
                  <p className="card-title">{course.course_name}</p>
                  <div className="card-rating">
                    <Rating
                      sx={{ fontSize: 17 }}
                      value={course.course_rating || 4.5}
                      precision={0.5}
                      // onChange={(_, newValue) => handleRatingChange(course.id, newValue)}
                    />
                    <span>{course.course_rating || 4.5}</span>
                  </div>
                  <div className="card-rating">
                    <AccessTimeOutlined
                      sx={{ fontSize: 18, color: "orangered" }}
                    />
                    <span>9 to 6</span>
                  </div>
                  <div className="card-pricee">
                    <p className="course-price" style={{ fontSize: 16 }}>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "PKR",
                      }).format(course?.course_fee)}
                    </p>
                    <p
                      className="course-original-price"
                      style={{ fontSize: 16 }}
                    >
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "PKR",
                      }).format(course?.course_fee * 2)}
                    </p>
                  </div>
                </div>
              </Box>
            </CustomTooltip>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

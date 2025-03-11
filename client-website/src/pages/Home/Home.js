import React from "react";
import css from "./Home.module.css";
import { bannerData } from "../../defaultData/defaultData";
import BannerComp from "../../components/BannerComp/BannerComp";
import CourseCarouselComp from "../../components/CourseCarouselComp/CourseCarouselComp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Box,
} from "@mui/material";
import { Carousel } from "antd";
import {
  ArrowForwardIos,
  ForkRightOutlined,
  Padding,
} from "@mui/icons-material";
import StudentsReviewCustomSlider from "./components/StudentsReviewCustomSlider";

const Home = () => {


  const topCategories = [
    {
      name: "Tajweed",
      image: "https://i.ytimg.com/vi/KgABlQuXyuU/maxresdefault.jpg",
    },
    {
      name: "Quran Reading",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuLr8KSjpGVUvUkY29DkVA7Wx4qHksbAyDtA&s",
    },
    {
      name: "Memorization",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_cTbVgmLJJnV8lhRJCvovED0MAL2MTuEbw&s",
    },
    {
      name: "Arabic Language",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXIwFsYTFy0MHaueVu58iQY18ZLFc676wNyQ&s",
    },
  ];

  const teachers = [
    {
      name: "Ustadh Ahmad",
      bio: "Expert in Quran recitation and Tajweed.",
      image: "https://iqna.ir/files/en/news/2023/1/8/124122_726.png",
    },
    {
      name: "Ustadh Muhtaram",
      bio: "Experienced in teaching Quran to children.",
      image: "https://iqna.ir/files/en/news/2023/1/8/124122_726.png",
    },
    {
      name: "Ustadh Muhtaram",
      bio: "Experienced in teaching Quran to children.",
      image: "https://iqna.ir/files/en/news/2023/1/8/124122_726.png",
    },
  ];

  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className={css.ma}>
      <div className={css.banner}>
        <BannerComp bannerData={bannerData[0]} />
      </div>

      {/* Hero Section */}

      {/* Popular Courses Section */}
      <Box
        style={{
          marginTop: "0px",
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(to left, rgb(0, 4, 40), rgb(30 74 113))",
          padding: "20px 0px",
          marginBottom: 15,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Top Courses
        </Typography>
      </Box>
      <CourseCarouselComp />

      {/* Top Categories Section */}

      <Box
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(to left, rgb(0, 4, 40), rgb(30 74 113))",
           padding: "23px 0px 20px 0px",
          marginBottom: 20,
        }}
      >
        {" "}
        <Typography
          variant="h4"
          component="h2"
          
          sx={{ color: "white", fontWeight: "bold", }}
        >
          Top Categories
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {topCategories.map((category, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Card
                sx={{
                  ":hover": {
                    boxShadow: 20,
                    opacity: 0.9,
                    cursor: "pointer",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image}
                  alt={category.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Teachers Section */}
      <Box
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(to left, rgb(0, 4, 40), rgb(30 74 113))",
          padding: "20px 0px",
          marginBottom: 20,
        }}
      >
        {" "}
        <Typography
          variant="h4"
          component="h2"
          
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Meet Our Teachers
        </Typography>
      </Box>
      <Container maxWidth="lg" style={{ marginTop: "40px" }}>
       
        
        <Grid container spacing={4}>
          {teachers.map((teacher, index) => (
            <Grid item xs={12} md={4}  key={index}>
              <Card sx={{boxShadow: 20,  ":hover": {
                    boxShadow: 20,
                    opacity: 0.9,
                    cursor: "pointer",
                  },}}>
                <CardMedia
                  component="img"
                  height="200"
                  image={teacher.image}
                  alt={teacher.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {teacher.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {teacher.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(to left, rgb(0, 4, 40), rgb(30 74 113))",
          padding: "20px 0px",
          marginBottom: 20,
        }}
      >
        {" "}
        <Typography
          variant="h4"
          component="h2"
          
          sx={{ color: "white", fontWeight: "bold", fontSize: {xs: '1.825rem', md: '2.125rem'}}}
        >
           What Our Students Say
        </Typography>
      </Box>
      <StudentsReviewCustomSlider />
    </div>
  );
};

export default Home;

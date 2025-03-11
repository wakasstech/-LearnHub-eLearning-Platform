import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';


const backgroundImageUrl = 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cXVyYW58ZW58MHx8MHx8fDA%3D';

const courses = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKKRZuKwS-ZE8q54VVRKMXg6IvtJXTpnzATsJpHH9YQ&s",
    title: "The Complete 2024 Web Development Bootcamp",
    description: "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
    instructor: "Dr. Angela Yu",
    rating: "4.7",
    students: "377,938",
    price: "$9.99",
    originalPrice: "$74.99"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKKRZuKwS-ZE8q54VVRKMXg6IvtJXTpnzATsJpHH9YQ&s",
    title: "The Web Developer Bootcamp 2024",
    description: "10 Hours of React just added. Become a Developer With ONE course - HTML, CSS, JavaScript, React, Node, MongoDB and More!",
    instructor: "Colt Steele",
    rating: "4.7",
    students: "272,327",
    price: "$9.99",
    originalPrice: "$74.99"
  }


  // Add more courses as needed...
];

const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(4),
  // textAlign: 'center',
  marginBottom: theme.spacing(4),
  height: '300px', // Adjust height as needed
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const CourseCard = ({ course }) => (
  <Card sx={{boxShadow: 10, borderRadius: 5, height: '350px'}}>
    <CardMedia
      component="img"
      height="140"
      image={course.image}
      alt={course.title}
    />
    <CardContent>
      <Typography gutterBottom variant="h7" fontWeight={800} component="div">
        {course.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {course.description}
      </Typography>
      <Typography variant="subtitle2" color="text.primary">
        Instructor: {course.instructor}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        Rating: {course.rating} ({course.students} students)
      </Typography>
      <Typography variant="subtitle2" color="text.primary">
        Price: {course.price} <span style={{ textDecoration: 'line-through', color: 'grey' }}>{course.originalPrice}</span>
      </Typography>
    </CardContent>
  </Card>
);

const CourseDetailPage = () => {
  return (
    <Box>
      <BackgroundContainer>
        {/* <Typography variant="h2" sx={{color: 'white', fontWeight: '600'}}>Al-Quran</Typography> */}
        <div class="shine">
  <h1>Al-Quran Course</h1>
</div>
        {/* <Typography variant="h6">Welcome to Thapa Technical. This channel is all about Website Development, Technical Tips and Tricks, and more!</Typography> */}
      </BackgroundContainer>
      <Box sx={{ padding: '20px', justifyContent: 'center', display: 'flex' }}>
      <Typography gutterBottom variant="h5" fontWeight={800} component="div">
        Lectures
      </Typography>
      </Box>
      <Grid container spacing={2} sx={{ padding: '20px' }}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={12} md={4} lg={3} key={index}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseDetailPage;

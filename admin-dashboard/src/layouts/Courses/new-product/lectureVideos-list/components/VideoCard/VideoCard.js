// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { Modal } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import  "./VideoCard.css";
// import { Favorite, PlayCircle, PlayAdd, ThumbUp, VisibilityOutlined, PlaylistAdd } from '@mui/icons-material';
// import playIcon from "../../../../../../assets/images/play-icon.png"
// import { Box, Rating } from '@mui/material';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import PropTypes from 'prop-types';



// const VideoCard = ({ video }) => {

 


//   const [expanded, setExpanded] = React.useState(false);
//   const [validImage, setValidImage] = useState(null);
//   const [open, setOpen] = React.useState(false);
//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   const navigate = useNavigate();
//   const handleOpen = () => {
//     // setOpen(true);
//     navigate("/academy/video-info", { state: { video } });
//   };

  


//   const defaultCourseThumbs = [
//     'https://media.istockphoto.com/id/1718890803/photo/close-up-of-holy-book-quran-at-mosque-sunlight-is-reflected-to-quran.webp?b=1&s=170667a&w=0&k=20&c=nZQ6tCRnxbK2dmQ5hHHoyKdCVumaiskPwNJZ0GPu_Uk=',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZ5bRblqFICE4-f0gQNUxOkqzkDMChgH8Kg&s' ,
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRVOteqWY1aIK721xRyOXj8G8ri8trrc88w&s'
//   ];

//   const getRandomDefaultImage = () => {
//     return defaultCourseThumbs[Math.floor(Math.random() * defaultCourseThumbs.length)];
//   };

//   useEffect(() => {
//     const validateImage = (src) => {
//       return new Promise((resolve) => {
//         const img = new Image();
//         img.onload = () => resolve(true);
//         img.onerror = () => resolve(false);
//         img.src = src;
//       });
//     };

//     const checkImage = async () => {
//       const isValid = await validateImage(video?.imgUrl);
//       setValidImage(isValid ? video?.imgUrl : getRandomDefaultImage());
//     };

//     checkImage();
//   }, [video?.imgUrl]);
//   return (
   
     
    
//       <Card sx={{boxShadow: 10, borderRadius: 5, height: '330px',
//       ':hover': {
//         boxShadow: 20,
//         opacity: 0.9,
//         cursor: 'pointer'
//       } 
//       }}>
    
//          <div className="imgBox">
//           <img 
//             src={validImage }
//             alt="course image" 
//             className="img" 
//           />
//           <div className="hovImgBox">
//             <img 
//             onClick={handleOpen} 
//             src={playIcon} alt="play icon" className="hovImg" />
//           </div>
//         </div>
//       <CardContent>
//         <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <Typography gutterBottom variant="h7" fontWeight={800} component="div">
//           {video?.title?.slice(0, 55) || "My Video"}..
//         </Typography>
//         <React.Fragment></React.Fragment>
//         <Rating sx={{fontSize: 15}} defaultValue={4}  />

//         </Box>
//         <Typography variant="body2" color="text.secondary" >
     
//         {(`${video?.desc}. Your gateway to Islamic knowledge and spiritual growth. Learn from our experienced scholars.` || 'Your gateway to Islamic knowledge and spiritual growth. Learn from our experienced scholars.').slice(0, 90)}...

//         </Typography>
//         {/* <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
//           Pid: {video?.videoPid}
//         </Typography> */}
//          <Box sx={{ display: 'flex',  justifyContent: 'space-between', marginTop: '10px' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton size="small">
//               <VisibilityOutlined fontSize="small" />
//             </IconButton>
//             <Typography variant="body2" color="text.secondary">
//               256K
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton size="small">
//               <PlaylistAdd fontSize="small" />
//             </IconButton>
//             <Typography variant="body2" color="text.secondary">
//               Play
//             </Typography>
//           </Box>
//           </Box>
       
//         {/* <Typography variant="subtitle2" color="text.primary">
//           Price: {course.price} <span style={{ textDecoration: 'line-through', color: 'grey' }}>{course.originalPrice}</span>
//         </Typography> */}
//       </CardContent>
//     </Card>
//   );
// };
// VideoCard.propTypes = {
//   video: PropTypes.object
// };
// export default VideoCard;

import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Rating } from "@mui/material";
import { PlayCircle, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import playIcon from "../../../../../../assets/images/play-icon.png";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const [validImage, setValidImage] = useState(null);

  const defaultCourseThumbs = [
    "https://media.istockphoto.com/id/1718890803/photo/close-up-of-holy-book-quran-at-mosque-sunlight-is-reflected-to-quran.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZ5bRblqFICE4-f0gQNUxOkqzkDMChgH8Kg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRVOteqWY1aIK721xRyOXj8G8ri8trrc88w&s",
  ];

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
      const isValid = await validateImage(video?.imgUrl);
      setValidImage(isValid ? video?.imgUrl : defaultCourseThumbs[Math.floor(Math.random() * defaultCourseThumbs.length)]);
    };

    checkImage();
  }, [video?.imgUrl]);

  const handleOpen = () => {
    navigate("/academy/video-info", { state: { video } });
  };

  return (
    <Box
    sx={{
      p: 1,
      border: "1px solid #ddd",
      borderRadius: 2,
      cursor: "pointer",
      ":hover": { backgroundColor: "#f9f9f9" },
      mb: 3,
    }}
  >
    {/* Responsive Flex Container */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 1,
        flexDirection: { xs: "column", sm: "row" }, // Column on mobile, row on larger screens
      }}
    >
      {/* Thumbnail */}
      <Box
        component="img"
        src={validImage}
        alt="Video Thumbnail"
        sx={{
          width: { xs: "100%", sm: 120 }, // Full width on mobile, fixed size on larger screens
          height: { xs: "auto", sm: 80 }, // Auto height on mobile, fixed on larger screens
          borderRadius: 1,
          objectFit: "cover",
        }}
      />
  
      {/* Video Details */}
      <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h6" fontWeight={600} fontSize={{ xs: "1rem", sm: "1.2rem" }}>
          {video?.title || "My Video"}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize={{ xs: "0.9rem", sm: "1rem" }}>
          {video?.desc?.slice(0, 80) || "A brief description of the video."}...
        </Typography>
      </Box>
  
      {/* Play Icon */}
      <IconButton onClick={handleOpen} sx={{ alignSelf: { xs: "center", sm: "auto" } }}>
        <img src={playIcon} alt="Play" width={40} />
      </IconButton>
    </Box>
  
    {/* Rating & Views Section */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: { xs: "center", sm: "flex-start" } }}>
      {/* Rating */}
      <Rating sx={{ fontSize: { xs: 16, sm: 18 } }} defaultValue={4} />
  
      {/* Views */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <VisibilityOutlined fontSize="small" />
        <Typography variant="body2">256K</Typography>
      </Box>
    </Box>
  </Box>
  
  );
};

VideoCard.propTypes = {
  video: PropTypes.object,
};

export default VideoCard;

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import  "./VideoCard.css";
import { Favorite, PlayCircle, PlayAdd, ThumbUp, VisibilityOutlined, PlaylistAdd } from '@mui/icons-material';
import playIcon from "../../assests/icons/play-icon.png"
import { Box, Rating } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const VideoCard = ({ video, videos }) => {
console.log(videos, 'videos in video card')

 


  const [expanded, setExpanded] = React.useState(false);
  const [validImage, setValidImage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();
  const handleOpen = () => {
    // setOpen(true);
    navigate("/videoDetail", { state: { video, videos } });
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
      const isValid = await validateImage(video?.imgUrl);
      setValidImage(isValid ? video?.imgUrl : getRandomDefaultImage());
    };

    checkImage();
  }, [video?.imgUrl]);
  return (
   
     
    
      <Card sx={{boxShadow: 10, borderRadius: 5, height: '330px',
      ':hover': {
        boxShadow: 20,
        opacity: 0.9,
        cursor: 'pointer'
      } 
      }}>
    
         <div className="imgBox">
          <img 
            src={validImage }
            alt="course image" 
            className="img" 
          />
          <div className="hovImgBox">
            <img 
            onClick={handleOpen} 
            src={playIcon} alt="play icon" className="hovImg" />
          </div>
        </div>
      <CardContent>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography gutterBottom variant="h7" fontWeight={800} component="div">
          {video?.title?.slice(0, 55) || "My Video"}..
        </Typography>
        <React.Fragment></React.Fragment>
        <Rating sx={{fontSize: 15}} defaultValue={4}  />

        </Box>
        <Typography variant="body2" color="text.secondary" >
     
        {(`${video?.desc}. Your gateway to Islamic knowledge and spiritual growth. Learn from our experienced scholars.` || 'Your gateway to Islamic knowledge and spiritual growth. Learn from our experienced scholars.').slice(0, 90)}...

        </Typography>
        {/* <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
          Pid: {video?.videoPid}
        </Typography> */}
         <Box sx={{ display: 'flex',  justifyContent: 'space-between', marginTop: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small">
              <VisibilityOutlined fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              256K
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small">
              <PlaylistAdd fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Play
            </Typography>
          </Box>
          </Box>
       
        {/* <Typography variant="subtitle2" color="text.primary">
          Price: {course.price} <span style={{ textDecoration: 'line-through', color: 'grey' }}>{course.originalPrice}</span>
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default VideoCard;


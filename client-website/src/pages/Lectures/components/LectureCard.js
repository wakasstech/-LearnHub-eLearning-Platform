import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Rating,
    IconButton
} from "@mui/material";
import { PlayCircleOutline, AccessTime, PersonOutline, Stars } from '@mui/icons-material';

const defaultLecture = {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKKRZuKwS-ZE8q54VVRKMXg6IvtJXTpnzATsJpHH9YQ&s",
    lecture_name: "Dars Islam..",
    lecture_description: "Your gateway to Islamic knowledge and spiritual growth. Learn from our experienced scholars.",
    instructor: "Ustad Muhtaram",
    rating: 4.8,
    students: 377938,
    price: "$9.99",
    originalPrice: "$74.99",
    lectures: 35,
    duration: "4.6"
};

const defaultCourseThumbs = [
  'https://img.freepik.com/free-photo/moon-light-shine-through-window-into-islamic-mosque-interior_1217-2597.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1718064000&semt=sph',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC2rvTnH0auS9xey3TJ1E82Ck7fSL8_zgEMQ&s' ,
  'https://st3.depositphotos.com/1277251/15741/i/450/depositphotos_157415046-stock-photo-muslim-man-raising-hand-and.jpg',
  'https://studioarabiya.com/wp-content/uploads/2023/04/b2ap3_large_quran_peace.jpg'
];

const getRandomDefaultImage = () => {
  return defaultCourseThumbs[Math.floor(Math.random() * defaultCourseThumbs.length)];
};

const LectureCard = ({ lecture }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/lectureVideos", {
            state: {
                lectureId: lecture?.id
            }
        });
    };

    return (
        <Card
            onClick={handleClick}
            sx={{
                boxShadow: 10,
                borderRadius: 5,
                height: '350px',
                transition: 'all 0.3s ease',
                ':hover': {
                    boxShadow: 30,
                    opacity: 0.9,
                    cursor: 'pointer',
                    background: 'linear-gradient(45deg, #dadbdb, transparent)'
                }
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={getRandomDefaultImage()}
                alt={lecture?.lecture_name || defaultLecture.lecture_name}
            />

            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="h6" fontWeight={800}>
                        {lecture?.lecture_name || defaultLecture.lecture_name}
                    </Typography>
                    <IconButton>
                        <PlayCircleOutline />
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                    {(`${lecture?.lecture_description}. Your gateway to Islamic knowledge and spiritual growth. Learn from our experienced scholars.` || defaultLecture.lecture_description).slice(0, 90)}...
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Box display="flex" alignItems="center">
                        <PersonOutline fontSize="small" />
                        <Typography variant="subtitle2" color="text.secondary" ml={1}>
                            {lecture?.instructor || defaultLecture.instructor}
                        </Typography>
                    </Box>
                    <Rating value={lecture?.rating || defaultLecture.rating} readOnly precision={0.5} />
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Stars fontSize="small" />
                        <Typography variant="subtitle2" color="text.secondary" ml={1}>
                            { defaultLecture.duration}
                        </Typography>
                    </Box>
                    <Typography variant="subtitle2" color="text.secondary">
                        {lecture?.videos?.length || 0} videos
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default LectureCard;
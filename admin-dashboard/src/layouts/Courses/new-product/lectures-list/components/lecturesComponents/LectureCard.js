import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Avatar,
    CardContent,
    Typography,
    Box,
    Rating,
    IconButton
} from "@mui/material";
import { PlayCircleOutline, AccessTime, PersonOutline, VideoFile } from '@mui/icons-material';
import PropTypes from 'prop-types';

const defaultLecture = {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKKRZuKwS-ZE8q54VVRKMXg6IvtJXTpnzATsJpHH9YQ&s",
    lecture_name: "Dars Islam",
    instructor: "Ustad Muhtaram",
    rating: 4.8,
    duration: "4.6 hours",
    videoLength: 0
};
const defaultCourseThumbs = [
    'https://img.freepik.com/free-photo/moon-light-shine-through-window-into-islamic-mosque-interior_1217-2597.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1718064000&semt=sph',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC2rvTnH0auS9xey3TJ1E82Ck7fSL8_zgEMQ&s',
    'https://st3.depositphotos.com/1277251/15741/i/450/depositphotos_157415046-stock-photo-muslim-man-raising-hand-and.jpg',
    'https://studioarabiya.com/wp-content/uploads/2023/04/b2ap3_large_quran_peace.jpg'
  ];
  
  const getRandomDefaultImage = () => {
    return defaultCourseThumbs[Math.floor(Math.random() * defaultCourseThumbs.length)];
  };
const LectureCard = ({ lecture }) => {
    const navigate = useNavigate();
    const [randomImage, setRandomImage] = useState("");
    useEffect(() => {
        setRandomImage(getRandomDefaultImage());
    }, []); // Run only once when the component mounts
    const handleClick = () => {
        navigate("/academy/lecture-videos", {
            state: {
                lectureId: lecture?.id
            }
        });
    };

    return (
        <Card
            onClick={handleClick}
            sx={{
                display: "flex",
                flexDirection: 'row',
                // alignItems: "center",
                // padding: 1.5,
                // boxShadow: 2,
                // borderRadius: 3,
                // transition: "all 0.3s ease",
                boxShadow: 5,
                  background: "linear-gradient(45deg, #dadbdb, transparent)",
                maxWidth: 450,
                ":hover": {
                    
                    cursor: "pointer",
                   
                }
            }}
        >
            {/* Avatar for Image */}
            <Avatar
                src={randomImage || defaultLecture.image}
                alt={lecture?.lecture_name || defaultLecture.lecture_name}
                sx={{ width: 80, height: 80, marginRight: 2,objectFit: "contain"  }}
            />

            {/* Content Section */}
            <CardContent sx={{ flex: 1, padding: "8px 0" }}>
                <Typography variant="h6" fontWeight={600} noWrap>
                    {lecture?.lecture_name || defaultLecture.lecture_name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <PersonOutline fontSize="small" />
                    <Typography fontSize="small" color="text.secondary" noWrap>
                        {lecture?.instructor || defaultLecture.instructor}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <AccessTime fontSize="small" />
                    <Typography fontSize="small" color="text.secondary">
                        {lecture?.duration || defaultLecture.duration}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <VideoFile fontSize="small" />
                    <Typography fontSize="small"color="text.secondary">
                        {lecture?.Videos?.length || defaultLecture.videoLength} Videos
                    </Typography>
                    <Typography fontSize="small"color="green" fontWeight={600} >
                        See Detail
                    </Typography>
                </Box>
            </CardContent>

          
        </Card>
    );
};

LectureCard.propTypes = {
    lecture: PropTypes.object
};

export default LectureCard;

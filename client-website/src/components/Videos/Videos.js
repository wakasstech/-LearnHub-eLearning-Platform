import React from 'react';
import { Grid, Box, Stack, useMediaQuery } from '@mui/material';
import VideoCard from '../VideoCard/VideoCard';

const Videos = ({ videos }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(min-width:601px) and (max-width:1670px)");
  const isLargeScreen = useMediaQuery("(min-width:1675px)");
  if (!videos) return "Retrieving Videos...";

  if (!videos?.length) return "No Videos Found...";


  const getGridSize = () => {
    if (isSmallScreen) {
      return 12;
    } else if (isMediumScreen) {
      return 6; // 2 columns in a row for medium screens
    } else if (isLargeScreen) {
      return 3; // 3 columns in a row for large screens
    }
    return 12; // Default to full width if no condition matches
  };
  return (


    // <Grid container spacing={3} >
    //   {videos.map((video, id) => (
    //     <Grid item key={id} xs={12} sm={6} md={4} rowSpacing={3}>
    //       <Box >
    //         <VideoCard video={video} videos={videos} />
    //       </Box>
    //     </Grid>
    //   ))}
    // </Grid>
  //   <Grid container spacing={3}>
    // {videos
    //   // .filter((video) => video.title) // Only include videos with a title
    //   .map((video, id) => (
  //       <Grid item xs={12} sm={12}   md={4}  key={id}>
          
  //           <VideoCard video={video} videos={videos} />
          
  //       </Grid>
  //     ))}
  // </Grid>
  <div className="video-app">
      <Grid container spacing={3}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
<VideoCard video={video} videos={videos} />
</Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Videos;

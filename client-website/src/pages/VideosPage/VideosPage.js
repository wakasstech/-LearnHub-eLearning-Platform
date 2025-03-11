import React, { useEffect } from 'react'
import { Stack, Box, Typography, Divider } from '@mui/material'
import UploadVideo from '../../components/UploadVideo/UploadVideo'
import Videos from '../../components/Videos/Videos'
import { Button } from 'antd'
import { FileUpload } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideos } from '../../globalStore/Slices/videoSlice'
import { useLocation } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { useParams } from 'react-router-dom'

// import { getUserInfo } from '../actions/UserAction'




const VideosPage = () => {
  const location = useLocation();
  const { lectureId } = location.state || {};
  const dispatch = useDispatch();
  const { userVideos, loading, error } = useSelector((state) => state.videos);

   console.log(userVideos?.Videos, 'global store videos');

useEffect(() => {

  dispatch(fetchVideos({ lectureId }));
}, [dispatch]);

  return (
    <Stack>
      <Box  sx={{ 
        overflowY: "auto", height: "90vh", flex: 2,  
        padding: { xs: "10px 13px",md: "15px 50px"}
              }} >
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <UploadVideo lectureID={lectureId} loading={loading} />
        </div>
     
      <Divider variant="middle" sx={{marginBottom: 5, marginTop: 2}}/>
        <h1 style={{textAlign: 'center', padding: '0px 0px 20px 0px', textDecoration: 'underline'}}>Lecture Videos</h1>
        <Videos  videos={userVideos?.Videos}/>
    
      </Box>
    </Stack>
  )
}

export default VideosPage
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Divider, Card } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import {
  CheckCircle,
  ThumbUp,
  ThumbUpAltOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import "./VideoModal.css";

import CommentSection from "./CommentSection";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // MUI back arrow icon

const VideoModal = () => {
  const location = useLocation();
  const { video } = location.state || {  };
  const navigate = useNavigate();
  const bgImage = "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page in history
  };
  
  return (


    <DashboardLayout
    sx={{
      backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
        `${linearGradient(
          rgba(gradients.info.main, 0.6),
          rgba(gradients.info.state, 0.6)
        )}, url(${bgImage})`,
      backgroundPositionY: "50%",
    }}
  >      <DashboardNavbar />
      <ArgonBox my={3}>
        <Card>
        <Box sx={{marginLeft: 2, marginTop: 2.5}}>

        <div style={{fontSize: '25px', cursor: 'pointer'}}>
              <ArrowBackIcon       onClick={handleBack}
 style={{ color: 'white',   backgroundColor: '#368FE3', borderRadius: 20 }} />

            </div>
            </Box>
        <Box minHeight="95vh" sx={{background: 'linear-gradient(45deg, transparent, transparent, #aeb5c7)'}}>
      <Stack direction={{ xs: "column", md: "column" }}>
        <Box flex={2}>
          <ReactPlayer
            className="react-player"
            url={video?.videoUrl}
            controls
          />
          <Box
            sx={{
           
              padding: {
                xs: "0px",
                md: "0px 35px",
              },
              marginBottom: 2,
            }}
          >
            {" "}
            <Typography color="#556176" variant="h5" fontWeight="bold" p={2}>
              {video?.title?.slice(0, 60) || "My Video"}
            </Typography>
            <Stack
              direction="row"
              gap={4}
              sx={{ color: "#556176" }}
              py={1}
              px={2}
            >
              <Link>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#556176"
                >
                  {`${video?.desc}. Your gateway to Islamic knowledge and spiritual growth. Learn from our experienced scholars.` ||
                    "Your gateway to Islamic knowledge and spiritual growth. Learn from our experienced scholars."}
                  ...
                </Typography>
              </Link>
            </Stack>
            <Box sx={{ display: "flex", marginTop: "10px", ml: "6px", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small">
                  <VisibilityOutlined fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  256K
                </Typography>
              </Box>
              {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small">
                  <ThumbUp fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  190K
                </Typography>
              </Box> */}
            </Box>
          </Box>
          <Divider />
       
          {/* <Box px={{xs:2, md:8}} py={{ md: 1, xs: 5 }} mt={2} mb={2}>
            <CommentSection />
          </Box>
          <Divider />
          <Box
            px={{ xs: 2, md: 8 }}
            py={{ md: 1, xs: 5 }}
            mt={5}
            justifyContent="center"
            alignItems="center"
          >
           
          </Box> */}
        </Box>
      </Stack>
    </Box>

        </Card>
        </ArgonBox>
       </DashboardLayout>

  
  );
};
export default VideoModal;

import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import {
  CheckCircle,
  ThumbUp,
  ThumbUpAltOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import "./VideoModal.css";

import Videos from "../Videos/Videos";
import CommentSection from "./CommentSection";

const VideoModal = () => {
  const location = useLocation();
  const { video, videos } = location.state || { videos: [] };
  console.log(videos, "videodetail videos");

  return (
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small">
                  <ThumbUp fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  190K
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
       
          <Box px={{xs:2, md:8}} py={{ md: 1, xs: 5 }} mt={2} mb={2}>
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
            <Videos videos={videos} />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
export default VideoModal;

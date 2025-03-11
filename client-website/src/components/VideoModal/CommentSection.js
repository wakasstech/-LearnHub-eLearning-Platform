// import { useState } from 'react';
// import { Avatar, Box, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
// import { Send } from '@mui/icons-material';

// const CommentSection = () => {
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       avatar: 'https://via.placeholder.com/40',
//       name: 'John Doe',
//       comment: 'Excellent video, learned a lot about the topic.',
//       replies: [
//         {
//           id: 1,
//           avatar: 'https://via.placeholder.com/40',
//           name: 'Jane Smith',
//           comment: 'I agree, the instructor did a great job explaining the concepts.'
//         },
//         {
//           id: 2,
//           avatar: 'https://via.placeholder.com/40',
//           name: 'Michael Johnson',
//           comment: 'Thanks for the insightful video. Its really helpful for my studies.'
//         }
//       ]
//     },
//     {
//       id: 2,
//       avatar: 'https://via.placeholder.com/40',
//       name: 'Sarah Williams',
//       comment: 'I have a question about the topic covered in the video. Can someone please help?',
//       replies: []
//     }
//   ]);

//   return (
//     <Box>
//       <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
//         Comments
//       </Typography>
//       {comments.map((comment) => (
//         <Box key={comment.id} sx={{ mb: 2 }}>
//           <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
//             <Avatar src={comment.avatar} />
//             <Typography variant="body1" fontWeight="bold" sx={{ ml: 2 }}>
//               {comment.name}
//             </Typography>
//           </Box>
//           <Typography variant="body1">{comment.comment}</Typography>
//           <Box sx={{ ml: 4 }}>
//             {comment.replies.map((reply) => (
//               <Box key={reply.id} display="flex" alignItems="center" sx={{ mb: 1 }}>
//                 <Avatar src={reply.avatar} />
//                 <Typography variant="body1" fontWeight="bold" sx={{ ml: 2 }}>
//                   {reply.name}
//                 </Typography>
//                 <Typography variant="body1" sx={{ ml: 2 }}>
//                   {reply.comment}
//                 </Typography>
//               </Box>
//             ))}
//             <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
//               <Avatar src="https://via.placeholder.com/40" />
//               <TextField
//               disabled
//                 placeholder="Add a comment..."
//                 variant="outlined"
//                 size="small"
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton>
//                         <Send />
//                       </IconButton>
//                     </InputAdornment>
//                   )
//                 }}
//                 sx={{ ml: 2, flex: 1 }}
//               />
//             </Box>
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default CommentSection;

import { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { Button } from "antd";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      name: "Muhammad Aslam",
      comment: "Excellent video, learned a lot about the topic.",
      replies: [
        {
          id: 1,
          avatar: "https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg",
          name: "Sajad Khan",
          comment:
            "I agree, the instructor did a great job explaining the concepts.",
        },
        {
          id: 2,
          avatar: "https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg",
          name: "Ali Asghar",
          comment:
            "Thanks for the insightful video. Its really helpful for my studies.",
        },
      ],
    },
    {
      id: 2,
      avatar: "https://static.vecteezy.com/system/resources/previews/035/624/082/non_2x/user-profile-person-icon-in-flat-isolated-in-suitable-for-social-media-man-profiles-screensavers-depicting-male-face-silhouettes-for-apps-website-vector.jpg",
      name: "Ayan Ali",
      comment:
        "I have a question about the topic covered in the video. Can someone please help?",
      replies: [],
    },
  ]);
  const [showAllComments, setShowAllComments] = useState(false);

  const initialComments = showAllComments ? comments : comments.slice(0, 1);

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Comments
      </Typography>
      {initialComments.map((comment) => (
        <Box key={comment.id} sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
            <Avatar src={comment.avatar} />
            <Typography variant="body1" fontWeight="bold" sx={{ ml: 2 }}>
              {comment.name}
            </Typography>
          </Box>
          <Typography variant="body1">{comment.comment}</Typography>
          <Box sx={{ ml: 4 }}>
            {comment.replies.map((reply) => (
              <Box
                key={reply.id}
                display="flex"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Avatar src={reply.avatar} />
                <Typography variant="body1" fontWeight="bold" sx={{ ml: 2 }}>
                  {reply.name}
                </Typography>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  {reply.comment}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
      {comments.length > 1 && (
        <Box textAlign="start" mt={2}>
          <Button
            style={{color: '#0c62ed'}}
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? "Show Less" : "Show More"}
          </Button>
        </Box>
      )}

{showAllComments && (
      <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
        <Avatar src="https://via.placeholder.com/40" />
        <TextField
          disabled
          placeholder="Add a comment..."
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ ml: 2, flex: 1 }}
        />
      </Box>
)}
    </Box>
  );
};

export default CommentSection;

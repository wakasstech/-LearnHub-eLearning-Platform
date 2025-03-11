const auth = require('./MiddleWares/auth.js');
const dotenv=require('dotenv')
const cors = require('cors');
const express = require('express');
const unless = require('express-unless');
const {Sequelize} = require('sequelize');
const bodyParser = require("body-parser");
const session = require("express-session");
//const {connectDB} = require("./db/index.js");
const Role = require('./modals/roleModel.js'); 
//const setupRoles = require('./MiddleWares/setupRoles.js');
//  Passing parameters separately (other dialects)
const app = express()
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/json' }));
app.use(
  session({
    secret: "dfsf94835asda",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json({ limit: '150mb' }));
 dotenv.config({path:'./config.env'});
 app.use(cors());
 app.use("/Images", express.static("Images"));
 //routes
 const userRoute = require("./routes/userRouter.js");
 const videoRoute = require("./routes/videoRoute.js");
 const categoryRoute = require("./routes/categoryRoute.js");
 const subcategoryRoute = require("./routes/subcategoryRoute.js");
 const courseRoute = require("./routes/courseRoute.js");
 const faqRoute = require("./routes/faqRoute.js");
 const lectureRoute = require("./routes/lectureRoute.js");
 const enrollmentRoute = require("./routes/enrollmentRoute.js");
 const searchRoute = require("./routes/searchRoute.js");
 const roleRoute = require('./routes/rollRoute');
 
 const suggestedRoute = require('./routes/suggestedRoute');
// middleware
app.use('/user', userRoute);
app.use('/video', videoRoute);
app.use('/category',categoryRoute);
app.use('/subcategory',subcategoryRoute);
app.use('/course',courseRoute);
app.use('/lecture',lectureRoute);
app.use('/enrollment',enrollmentRoute);
app.use('/faq',faqRoute);
app.use('/search',searchRoute);
app.use('/role', roleRoute);
app.use('/sfaq', suggestedRoute);
//previosly connected mongodb<................Now Converting To Sequelizing..............>
//  connectDB()
// .then(() => {

// app.listen(process.env.PORT || 9090, () => {
//   console.log(`⚙️ Server is running at port : ${process.env.PORT || 9090}`);
// });
// })
// .catch((err) => {
//     console.log("MONGO db connection failed !! ", err);
// })
//   app.listen(process.env.PORT,()=>{
//     console.log(" Server is running on port 5000");
// });
app.listen(process.env.PORT,()=>{
  console.log(`Server is running ${process.env.PORT}`);
});


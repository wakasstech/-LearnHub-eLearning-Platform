import React from 'react';
import { Routes, Route } from "react-router-dom";
import Courses from "../pages/Courses/Courses";
import Lectures from "../pages/Lectures/Lectures";
import Videos from "../pages/VideosPage/VideosPage";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import VideoModal from "../components/VideoModal/VideoModal";
import Dashboard from '../pages/Dashboard/Dashboard';
import PrivateRoutes from './PrivateRoutes';
import { AdminRoute } from './AdminRoute';
import CoursePage from '../pages/Courses/CoursePage/CoursePage/CoursePage';

const AppRouting = () => (
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="*" element={<div><h1>Page Not Found</h1></div>} />

              <Route path="/dashboard" 
               element={
                <PrivateRoutes>
                {/* <AdminRoute> */}
                <Dashboard/>
                {/* </AdminRoute> */}
                </PrivateRoutes>
              }
                />

                <Route path="/courses" element=
                {
                  <PrivateRoutes>
                  <Courses/>
                  </PrivateRoutes>
                } />

                <Route path="/course_detail"
                 element={
                <PrivateRoutes>
                {/* <AdminRoute> */}
                <CoursePage/>
                {/* </AdminRoute> */}
                </PrivateRoutes>
              } 
                />

<Route path="/course_lectures"
                 element={
                <PrivateRoutes>
                {/* <AdminRoute> */}
                <Lectures/>
                {/* </AdminRoute> */}
                </PrivateRoutes>
              } 
                />
                <Route path="/lectureVideos" element={
               
                <PrivateRoutes>
                {/* <AdminRoute> */}
                <Videos />
                {/* </AdminRoute> */}
                </PrivateRoutes>
                }  />
                <Route path="/videoDetail" element={
                <PrivateRoutes>
                {/* <AdminRoute> */}
                <VideoModal/>
                {/* </AdminRoute> */}
                </PrivateRoutes>
                } /> 
                <Route path="/students" element={
                <PrivateRoutes>
                {/* <AdminRoute> */}
                <div>Students</div>
                {/* </AdminRoute> */}
                </PrivateRoutes>
                } />
                <Route path="/signin" element={<SignIn/>}  />
                <Route path="/signup" element={<SignUp/>}  />
  </Routes>
);

export default AppRouting;

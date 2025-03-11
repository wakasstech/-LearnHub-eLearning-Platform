import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import "./App.css";
import HeaderComponent from "./components/SideAndTopNavigation/HeaderComponent";
import DrawerComponent from "./components/SideAndTopNavigation/DrawerComponent ";
import SidebarComponent from "./components/SideAndTopNavigation/SidebarComponent ";
import AppRouting from "./Routing/AppRouting";
import { fetchCategories } from "./globalStore/Slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setAuthState } from "./globalStore/Slices/AuthSlice";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'; 


const { Header, Content } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticate, "authenticate");
  const token = useSelector((state) => state.auth.token);

  // useEffect(() => {
  //   // Fetch categories when app mounts

  //   if (isAuthenticate) {
  //     dispatch(fetchCategories());
  //     dispatch(fetchUser());
  //   }
  // }, [dispatch, isAuthenticate]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Time in seconds
        if (decodedToken.exp > currentTime) {
          dispatch(fetchCategories());
          dispatch(fetchUser());
  
        } else {
          // Handle token expiration (e.g., logout or request new token)
          console.log("Token has expired");
           Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Your session has timed out. Please log in again.',
            showCancelButton: false,
            confirmButtonText: 'OK',
            // cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
              
                //  dispatch(removeToken());
                localStorage.clear();
              
                window.location.href="http://localhost:3000/"
               
            } else {
              // User clicked Cancel or closed the popup
              // Handle accordingly
            }
        });
        }
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [dispatch, token, isAuthenticate]); // Add token and isAuthenticate to dependencies

  const isLargeScreen = useMediaQuery("(min-width: 961px)");
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const {token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => setIsDrawerVisible(true);
  const onClose = () => setIsDrawerVisible(false);

  const role = "user";

  const hideSiderPaths = () =>
    location.pathname === "/" || location.pathname === "/signin" || location.pathname === "/signup";
  const hideHeaderPaths = () => location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!hideHeaderPaths() && (
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            padding: "6px 40px",
            backgroundColor: "#0E162B",
            // background: "linear-gradient(45deg, #1c345c, #7a53a7e8)", // Set background color to red
          }}>
          <HeaderComponent showDrawer={showDrawer} />
        </Header>
      )}

      {!isLargeScreen && (
        <DrawerComponent isDrawerVisible={isDrawerVisible} onClose={onClose} />
      )}

      <Layout>
        
        {!isSmallScreen && !hideSiderPaths() && role !== "user"   && role !== "student"  && role !== "teacher" &&   (
          <SidebarComponent
            hideSiderPaths={hideSiderPaths}
            isSmallScreen={isSmallScreen}
          />
        )}

        <Layout
          style={{
            minHeight: "100vh",
            marginLeft:
              isSmallScreen || hideSiderPaths() || role == "user" || role == "student" || role == "teacher"  ? 0 : 200,
            // padding: isSmallScreen ? "0 0px 0px" : "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: isSmallScreen || hideSiderPaths() || role == "user" || role == "student" || role == "teacher"  ? 0 :24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <AppRouting />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;




// import React, { useEffect, useState } from "react";
// import StudentsReviewCustomSlider from "../src/pages/Home/components/StudentsReviewCustomSlider"
// const App = () => {

//   return (
//      <div>
//   <StudentsReviewCustomSlider />
//      </div>
//   )
// };
//   export default App;
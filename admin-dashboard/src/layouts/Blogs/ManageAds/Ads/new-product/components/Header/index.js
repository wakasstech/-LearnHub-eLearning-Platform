/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";

// Argon Dashboard 2 PRO MUI example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Argon Dashboard 2 PRO MUI base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Header({ tabValue, onTabChange, hide }) {

  const navigate = useNavigate();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  // const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => {
    onTabChange(newValue);
  };


  return (
    <ArgonBox position="relative">
      <DashboardNavbar absolute light />
      <ArgonBox height="200px" />
      <Card
        sx={{
          py: 2,
          px: 2,
          boxShadow: ({ boxShadows: { md } }) => md,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
          <ArgonAvatar variant="rounded"  sx={{
                bgcolor: 'primary.main', // Background color using theme's primary color
                color: 'white', // Text color
                fontSize: '1.5rem', // Adjust font size
              }} size="lg">
              A
            </ArgonAvatar>
          </Grid>
          <Grid item>
            <ArgonBox height="100%" mt={0.5} lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                Admin
              </ArgonTypography>
              {/* <ArgonTypography variant="button" color="text" fontWeight="medium">
                CEO / Co-Founder
              </ArgonTypography> */}
            </ArgonBox>
          </Grid>

         
        </Grid>
      </Card>
    </ArgonBox>
  );
}

Header.propTypes = {
  tabValue: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
  hide:PropTypes.bool.isRequired
};

export default Header;

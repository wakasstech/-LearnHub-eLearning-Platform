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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import { Category, CategoryOutlined } from "@mui/icons-material";

function ComplexReportsDoughnutChartItem({ image, title, percentage, hasBorder }) {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={({ borders: { borderWidth }, palette: { light } }) => ({
        borderBottom: hasBorder ? `${borderWidth[1]} solid ${light.main}` : 0,
      })}
    >
      <Grid item xs={10}>
        <ArgonBox display="flex" py={1.5} px={2}>
         
            <ArgonBox mr={1}>
             
      <CategoryOutlined sx={{color: '#344767'}} />

            </ArgonBox>
         
          <ArgonBox display="flex" flexDirection="column" justifyContent="center">
            <ArgonTypography
              component="div"
              variant="button"
              textTransform="capitalize"
              fontWeight="medium"
            >
              {title}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      </Grid>
      <Grid item xs={2}>
        <ArgonBox py={0.8} px={1} textAlign="center">
          <ArgonTypography variant="caption" color="text" fontWeight="medium">
            {percentage}
          </ArgonTypography>
        </ArgonBox>
      </Grid>
    </Grid>
  );
}

// Setting default values for the props of ComplexReportsDoughnutChartItem
ComplexReportsDoughnutChartItem.defaultProps = {
  image: "",
  hasBorder: false,
};

// Typechecking props for the ComplexReportsDoughnutChartItem
ComplexReportsDoughnutChartItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool,
};

export default ComplexReportsDoughnutChartItem;

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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components



// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "globalStore/Slices/categoriesSlice";
import { useSelector } from "react-redux";
import createDataTableData from "./data/dataTableData";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import ArgonProgress from "components/ArgonProgress";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Button,
  Grid,
  CircularProgress,
  Modal,
  TextField,
  Box,
  Stack,


} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from '../../../../axios/axios';

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
function CategoriesList() {

 const navigate = useNavigate();
  
  const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategoryData, setEditCategoryData] = useState(null);
  const [editSubCategoryData, setEditSubCategoryData] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/category/get-all-category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (data) => {
    setEditCategoryData(data);
    setIsCategoryModalOpen(true);
  };

  const handleViewCategory = (data) => {
    const type = "category";
    navigate("/academy/courses-list", { state: { searchCoursesId: data?.id, type } });
  };

  const handleViewSubCategory = (data) => {
    // console.log(data?.id)
    const type = "subcategory";
    navigate("/academy/courses-list", { state: { searchCoursesId: data?.id, type } });
  };

  const handleEditSubCategory = (data) => {
    setEditSubCategoryData(data);
    setIsSubCategoryModalOpen(true);
  };

  const handleSaveCategory = async () => {
    try {
      await axios.put(
        `/category/updatecategory/${editCategoryData.id}`,
        {
          category_name: editCategoryData.category_name,
          category_description: editCategoryData.category_description,
        }
      );
      setIsCategoryModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleSaveSubCategory = async () => {
    try {
      await axios.put(
        `/update-single-sub-category/${editSubCategoryData.id}`,
        {
          sub_category_name: editSubCategoryData.sub_category_name,
          sub_category_description: editSubCategoryData.sub_category_description,
        }
      );
      setIsSubCategoryModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
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
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="bold">
                All Categories
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              {/* {categories.length > 0 && (
                <>
                  <ArgonButton variant="gradient" color="error" size="small" onClick={handleDelete}>
                    Delete
                  </ArgonButton>
                  <ArgonButton variant="gradient" color="info" size="small" onClick={handleStatusUpdate}>
                    Update Status ▼
                  </ArgonButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={handleFileChangee} value="in_boycott">
                      in_boycott
                    </MenuItem>
                    <MenuItem onClick={handleStatusChange} value="questionable">
                      questionable
                    </MenuItem>
                  </Menu>
                </>
              )} */}
             
                
                 
              <Link to="/product_managment/products/products-list">
                <ArgonButton variant="gradient" color="info" size="small">
                  See All Products
                </ArgonButton>
              </Link>
            </Stack>
          </ArgonBox>

    



    

          <div
      style={{
        
        padding: "15px",
        minHeight: "100vh",
      }}
    >
      {loading ? (
        <LoadingSpinner  />
      ) : categories?.length > 0 ? (
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} key={category.id}>
              <Card sx={{border: "1px solid rgb(236 237 237)"}}>
                <CardContent>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Typography variant="h5">{category.category_name}</Typography>
                    <Box>
                      <IconButton onClick={() => handleEditCategory(category)}>
                        <EditIcon />
                      </IconButton>
                      {category.subCategories.length ===   0 && (
  <IconButton onClick={() => handleViewCategory(category)}>
  <VisibilityIcon />
</IconButton>
                      )}
                    
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Typography variant="body2" color="textSecondary">
                    {category.category_description}
                  </Typography>
                  <Accordion
                    disableGutters
                    sx={{
                      marginTop: 2,
                      marginLeft: 0,
                      paddingLeft: 0,
                      boxShadow: "none", // Remove shadow
                      borderTop: "none", // Remove top border
                    }}
                  >
                    <AccordionSummary sx={{background: 'linear-gradient(45deg, #a0a0ed, transparent)'}} expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{
    fontWeight: 700,
    fontSize: 15, color: '#fff'}}>Subcategories</Typography>
                    </AccordionSummary>
                    <AccordionDetails  sx={{
      maxHeight: 200, // Set a fixed height
      overflowY: "auto", // Enable vertical scrolling
      marginTop: 2
    }}>
                      {category.subCategories.length > 0 ? (
                        category.subCategories.map((sub) => (
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                            key={sub.id}
                            sx={{ marginBottom: 1 }}
                          >
                            <Typography variant="h6">{sub.sub_category_name}</Typography>
                            <Box>
                              <IconButton onClick={() => handleEditSubCategory(sub)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleViewSubCategory(sub)}>
                                <VisibilityIcon />
                              </IconButton>
                              <IconButton color="error">
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))
                      ) : (
                        <Typography  sx={{
                          color: "grey",
                           fontSize: 16,
                          paddingBottom: "20px",
                          marginTop: 3,
                          textAlign: "center",
                          fontStyle: 'italic'
                        }}>No subcategories found...</Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          sx={{
            color: "grey",
             fontSize: 16,
            paddingBottom: "20px",
            marginTop: 3,
            textAlign: "center",
            fontStyle: 'italic'
          }}
        >
          No categories found...
        </Typography>
      )}

      {/* Edit Category Modal */}
      <Modal open={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)}>
            <Box sx={{  position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,}}>
                <Grid container justifyContent="space-between" alignItems="center">
                <Typography>Edit Category</Typography>
                <IconButton onClick={() => setIsCategoryModalOpen(false)}>
              <CloseIcon />
            </IconButton>

                </Grid>
              <label style={{    fontSize: 14,
    color: 'grey'}}>Name</label>
              <TextField
                fullWidth
                value={editCategoryData?.category_name || ""}
                onChange={(e) =>
                  setEditCategoryData({ ...editCategoryData, category_name: e.target.value })
                }
                sx={{ marginBottom: 2 }}
              />
               <label style={{    fontSize: 14,
    color: 'grey'}}>Description</label>
              <TextField
                fullWidth
                value={editCategoryData?.category_description || ""}
                onChange={(e) =>
                  setEditCategoryData({ ...editCategoryData, category_description: e.target.value })
                }
                sx={{ marginBottom: 2 }}
              />
              <Button variant="contained" fullWidth onClick={handleSaveCategory}>
              <Typography style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>   Save
              </Typography>
              </Button>
            </Box>
          </Modal>

          {/* Edit Subcategory Modal */}
          <Modal open={isSubCategoryModalOpen} onClose={() => setIsSubCategoryModalOpen(false)}>
            <Box sx={{  position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,}}>
               <Grid container justifyContent="space-between" alignItems="center">
                <Typography>Edit Sub-Category</Typography>
                <IconButton onClick={() => setIsSubCategoryModalOpen(false)}>
              <CloseIcon />
            </IconButton>

                </Grid>
              <label style={{    fontSize: 14,
    color: 'grey'}}>Name</label>
              <TextField
                fullWidth
                value={editSubCategoryData?.sub_category_name || ""}
                onChange={(e) =>
                  setEditSubCategoryData({ ...editSubCategoryData, sub_category_name: e.target.value })
                }
                sx={{ marginBottom: 2 }}
              />
               <label style={{    fontSize: 14,
    color: 'grey'}}>Description</label>
              <TextField
                fullWidth
                value={editSubCategoryData?.sub_category_description || ""}
                onChange={(e) =>
                  setEditSubCategoryData({
                    ...editSubCategoryData,
                    sub_category_description: e.target.value,
                  })
                }
                sx={{ marginBottom: 2 }}
              />
              <Button variant="contained" fullWidth onClick={handleSaveSubCategory}>
              <Typography style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>   Save
                </Typography>
              </Button>
            </Box>
          </Modal>
   
    </div>

        </Card>

        <div>
      {/* Render the data table */}
      
      {/* Render the modal */}
     
    </div>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default CategoriesList;
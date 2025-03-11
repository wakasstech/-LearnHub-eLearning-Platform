import { useEffect, useState } from "react";
import { Grid, Card, Stepper, Step, StepLabel, CircularProgress, Button, Typography } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ArgonSnackbar from "components/ArgonSnackbar"; // Assuming ArgonSnackbar is a snackbar component in your project
import usePost from "hooks/usePost";
import  {useNavigate} from 'react-router-dom'
import CategoryInfo from "./components/CategoryInfo";
import Header from "./components/Header";
import { createCategory } from "globalStore/Slices/categoriesSlice";
import { useDispatch } from "react-redux";
import FormField from "./components/FormField";
import ArgonSelect from "components/ArgonSelect";
import axios from '../../../axios/axios';
import PropTypes from 'prop-types';


const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

function getSteps() {
  return ["1. Product Info", "2. Media", "3. Social", "4. Pricing"];``
}

function getStepContent(stepIndex, formData, handleChange, handleImageChange, errors) {
  switch (stepIndex) {
    case 0:
      return <CategoryInfo formData={formData} handleChange={handleChange} handleImageChange={handleImageChange} errors={errors} />;

    default:
      return null;
  }
};

function NewCategory({isSubcategory}) {
  // const isSubcategoryTrue  = true;
const [isSubcategoryTrue, setIsSubcategoryTrue] = useState(isSubcategory);
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: "",
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState("");


  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [tabValue, setTabValue] = useState(0);
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate();
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };


  useEffect(() => {
    // Update state when isSubcategory prop changes
    setIsSubcategoryTrue(isSubcategory);
    setFormData({
      name: "",
      description: "",
      parentId: "",
    });
    setSelectedCategoryId("");
  }, [isSubcategory]);

  
  useEffect(() => {
  
      fetchCategories();
   
  }, [ selectedCategoryId]);


  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "/category/get-all-category"
      );
      setCategories(response.data); // Update categories state with fetched data
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // Stop loading after the request completes
    }
  };



  const categoryOptions =
    categories.length > 0
      ? categories.map((category) => ({
          value: category.id,
          label: category.category_name,
        }))
      : [];

      const handleSubmit = async () => {
        console.log(formData.parentId, 'selected')
        try {
          if (isSubcategoryTrue && formData.parentId) {
            // Create subcategory
            await axios.post(`/subcategory/${formData.parentId}/create-sub-category`, {
              sub_category_name: formData.name,
              sub_category_description: formData.description,
            });
            setAlert({
              open: true,
              message: "Subcategory created successfully!",
              severity: "success",
            });
            setTimeout(() => {
              navigate("/academy/categories-list");
            }, 2000);
          } else {
            // Create category
            const response = await axios.post("/category/create-category", {
              category_name: formData.name,
              category_description: formData.description,
            });
    
            const createdCategoryId = response.data?.id; // Assuming API returns the created category ID
            setSelectedCategoryId(createdCategoryId);
            setFormData((prev) => ({ ...prev, name: "", description: "", parentId: createdCategoryId  }));

    
            setAlert({
              open: true,
              message: "Category created successfully! Redirecting to subcategory form...",
              severity: "success",
            });
    
            // Redirect to subcategory form with created category ID
            setTimeout(() => {
              setIsSubcategoryTrue(true)
            }, 1000);
          }
        } catch (error) {
          console.error("Error creating:", error);
          setAlert({ open: true, message: "Failed to create category/subcategory.", severity: "error" });
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
  >
      <Header />
      <ArgonBox mt={3} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <Card sx={{ overflow: "visible" }}>
                  <ArgonBox p={2}>
                    <ArgonBox>
                    <Grid container spacing={3} sx={{ padding: 3 }}>
      {/* Name Field */}
      <Grid item xs={12} md={6}>
        <FormField
          type="text"
          label={isSubcategoryTrue ? "Subcategory Name" : "Category Name"}
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Grid>

      {/* Description Field */}
      <Grid item xs={12} md={6}>
        <FormField
          type="text"
          label={isSubcategoryTrue ? "Subcategory Description" : "Category Description"}
          placeholder="Enter description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Grid>

      {/* Parent Category Dropdown */}
      {isSubcategoryTrue && (
        <Grid item xs={12} md={6}>
          <ArgonSelect
            name="parentId"
            // value={
            //   categoryOptions.find(option => option.value === formData.parentId) || null
            // }
        

            // // value={categoryOptions.find(option => option.value === formData.parentId)}
            // onChange={(selected) =>
            //   handleChange({ target: { name: "parentId", value: selected.value } })
            // }           
            value={
              formData.parentId
                ? categoryOptions.find((option) => option.value === formData.parentId) || null
                : null
            }
            onChange={(selected) =>
              setFormData((prev) => ({ ...prev, parentId: selected.value }))
            }
            
            // options={categories?.map((cat) => ({
            //   value: cat.id,
            //   label: cat.category_name,
            // }))}
            options={categoryOptions}
            placeholder="Select Parent Category"
          />
        </Grid>
      )}

      {/* Submit Button */}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit} >
        <Typography style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
        Submit
          </Typography>  
        </Button>
      </Grid>
    </Grid>
                     
                    </ArgonBox>
                  </ArgonBox>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ArgonBox>
      {/* <Footer /> */}
      <ArgonSnackbar
        color={alert.severity}
        
        title="Message"
        content={alert.message}
        open={alert.open}
        close={() => setAlert({ ...alert, open: false })}
      />
    </DashboardLayout>
  );
}

NewCategory.propTypes = {
  isSubcategory: PropTypes.bool,

};

export default NewCategory;

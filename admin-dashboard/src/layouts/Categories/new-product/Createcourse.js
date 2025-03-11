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
import { Checkbox, Form, Input, Select, Spin } from "antd";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";


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
  const [form] = Form.useForm();
  const loading = useSelector(state => state.courses.loading);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: "",
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [tabValue, setTabValue] = useState(0);
//   const [loading, setLoading] = useState(true); // Loading state

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
  }, []);
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/category/get-all-category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
   
    }
  };
  // Handle category change and update subcategories
const handleCategoryChange = (value) => {
    const selectedCat = categories.find(cat => cat.id === value);
    setSelectedCategory(value);
    setSubcategories(selectedCat ? selectedCat.subCategories : []);
    form.setFieldsValue({ subcategory: undefined }); // Reset subcategory selection
  };
//   useEffect(() => {
  
//       fetchCategories();
   
//   }, [ selectedCategoryId]);


//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(
//         "/category/get-all-category"
//       );
//       setCategories(response.data); // Update categories state with fetched data
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     } finally {
//       setLoading(false); // Stop loading after the request completes
//     }
//   };



// const handleSubmit = async (values) => {
//     const { category, subcategory } = values;
//     const searchTypeId = subcategory ? { subcategoryId: subcategory } : { categoryId: category };
  
//     const valuesWithSearchId = { ...values, ...searchTypeId };
//     console.log("Submitted Values:", valuesWithSearchId);
//   };
    
const handleSubmit = async (values) => {
    const { category, subcategory } = values;
    let searchTypeId = {};
  
    if (subcategory) {
      searchTypeId = { [`subcategoryId`]: subcategory };
    } else if (category) {
      searchTypeId = { [`categoryId`]: category };
    }
  
    const valuesWithSearchId = { ...values, ...searchTypeId };
  
    // Remove category and subcategory fields from submission
    delete valuesWithSearchId.category;
    delete valuesWithSearchId.subcategory;
  
    console.log("Final Submission Data:", valuesWithSearchId);
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
      <ArgonBox mt={3} mb={10}    >
     
                    <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
                    <Spin spinning={loading} >
                        
        <Form style={{border:"1px solid #d0caca", padding:"20px 30px",borderRadius:8, background:'white'}}
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item
            name="course_name"
            label="Course Name"
            className="custom-label"
            rules={[{ required: true, message: 'Please enter course name' }]}
          >
            <Input />
          </Form.Item>


 {/* Category Dropdown */}
 <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
        <Select placeholder="Select Category" onChange={handleCategoryChange}>
          {categories.map(category => (
            <Select.Option key={category.id} value={category.id}>
              {category.category_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Subcategory Dropdown (Conditional) */}
      {subcategories.length > 0 && (
        <Form.Item name="subcategory" label="Subcategory">
          <Select placeholder="Select Subcategory">
            {subcategories.map(sub => (
              <Select.Option key={sub.id} value={sub.id}>
                {sub.sub_category_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}



          <Form.Item
            name="duration"
            label="Duration"
            className="custom-label"
            rules={[{ required: true, message: 'Please enter course duration' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="course_fee"
            label="Course Fee"
            className="custom-label"
            rules={[{ required: true, message: 'Please enter course fee' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="course_salary"
            label="Course Salary"
            className="custom-label"
            rules={[{ required: true, message: 'Please enter course salary' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="course_timings"
            label="Course Timmings"
            className="custom-label"
            rules={[{ required: true, message: 'Please enter course timmings' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="thumbnail_image"
            label="Thumbnail Image URL"
            className="custom-label"
            rules={[{ required: true, message: 'Please enter thumbnail image URL' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="is_premium"
            label="Is Premium"
            className="custom-label"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            name="course_description"
            label="Course Description"
            className="custom-label"
            rules={[{ required: true, message: 'Please enter course description' }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="course_outline"
            label="Course Outline"
            className="custom-label"
            rules={[{ required: true, message: 'Please enter course outline' }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="pre_requisites"
            label="Pre-requisites"
            className="custom-label"
            rules={[{ required: true, message: 'Please enter pre-requisites' }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item>
            {/* <Button type="primary" htmlType="submit">
            Create
            </Button> */}
            <Grid item xs={12}>
        <Button variant="contained" type="primary" htmlType="submit"  >
        <Typography style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
        Submit
          </Typography>  
        </Button>
      </Grid>
          </Form.Item>
        </Form>
      </Spin>
      {/* Submit Button */}
     
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

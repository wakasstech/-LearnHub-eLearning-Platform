import React, { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";

const SearchAutoComplete = ({ placeholder = "Search", width = 300 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (inputValue) {
      handleSearch(inputValue);
    }
  }, [inputValue]);

  const handleSearch = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/search/searchkeyword?queries=${value}`
      );
      const { courses, subcategories, categories } = response.data;
      const formattedOptions = [];
      if (courses?.length > 0) {
        formattedOptions.push({
          label: "Courses",
          options: courses.map((course) => ({
            value: course.id,
            label: course?.course_name,
            completeInfo: course,
            type: "course",
            
          })),
        });
      }

      if (subcategories?.length > 0) {
        formattedOptions.push({
          label: "Subcategories",
          options: subcategories.map((subcategory) => ({
            value: subcategory.id,
            label: subcategory.name,
            completeInfo: subcategory,
            type: "subcategory",
          })),
        });
      }

      if (categories?.length > 0) {
        formattedOptions.push({
          label: "Categories",
          options: categories.map((category) => ({
            value: category.id,
            label: category.name,
            completeInfo: category,
            type: "category",
          })),
        });
      }

      setOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  const onSelect = (value, option) => {
    const { completeInfo, type } = option;
    if (type === "course") {
    
      navigate("/course_detail", {
        state: {
          courseId: value,
          completeInfo: completeInfo,
        },
      });
      // navigate("/courses", { state: { searchCoursesId: value, type: "courses" } });
    } else if (type === "subcategory") {
   
      navigate("/courses", { state: { searchCoursesId: value, type } });
      localStorage.setItem('searchCoursesId', value);
      localStorage.setItem('type', type);
      // navigate("/subcategories", { state: { searchSubcategoryId: value, type: "subcategories" } });
    } else if (type === "category") {
      alert("fdg");
      return;
      navigate("/courses", { state: { searchCoursesId: value, type } });
      localStorage.setItem('searchCoursesId', value);
      localStorage.setItem('type', type);
     

      // navigate("/categories", { state: { searchCategoryId: value, type: "categories" } });
    }
    setInputValue(option.label);
    setSelectedValue(value);
  };

  const handleEnterButton = () => {
    if (selectedValue) {
      alert(`Enter button clicked. Selected ID: ${selectedValue}`);
    } else {
      alert("Enter button clicked. No selection made.");
    }
  };

  return (
    <AutoComplete
      popupMatchSelectWidth={252}
      style={{ marginLeft: "10px", marginRight: "10px", width }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      value={inputValue}
      onChange={setInputValue}
      size="large"
    >
      <Input.Search
        size="large"
        placeholder={placeholder}
        enterButton
        onSearch={handleEnterButton}
      />
    </AutoComplete>
  );
};

export default SearchAutoComplete;

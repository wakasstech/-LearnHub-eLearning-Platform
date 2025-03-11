import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, List, Spin, Row, Col, Card } from 'antd';
import CategoryModal from './CategoryModal';
import SubcategoryModal from './SubcategoryModal';
import { clearNewlyCreatedCategoryId, fetchCategories } from '../../globalStore/Slices/categoriesSlice';
import "./CategoryManagementPage.css";
import { Container } from '@mui/material';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories, loading, newlyCreatedCategoryId } = useSelector(state => state.categories);

  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isSubcategoryModalVisible, setIsSubcategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [isAddMode, setIsAddMode] = useState(true);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (newlyCreatedCategoryId) {
      setCurrentCategoryId(newlyCreatedCategoryId);
      setIsSubcategoryModalVisible(true);
      dispatch(clearNewlyCreatedCategoryId());
    }
  }, [newlyCreatedCategoryId, dispatch]);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsAddMode(true);
    setIsCategoryModalVisible(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsAddMode(false);
    setIsCategoryModalVisible(true);
  };

  const handleAddSubcategory = (categoryId) => {
    setCurrentCategoryId(categoryId);
    setIsSubcategoryModalVisible(true);
  };

  return (
    <Container sx={{paddingTop: 3}}>
      <Row justify="end" style={{ marginBottom: 20 }}>
        <Button className="add-category-button" onClick={handleAddCategory}>Add Category</Button>
      </Row>
      
      <div className="container">
      <Spin spinning={loading}>
        {categories.map((category) => (
          <div className="category-box" key={category.id}>
            <Row gutter={[16, 16]} style={{ width: '100%' }}>
              <Col xs={24} md={12}>
                <div className="category-content">
                  {/* <div className="category-title">{category.category_name}</div> */}
                  <header>
        <h1>{category?.category_name}</h1>
    </header>
                  <div className="category-description">
                    <strong className="strong-color">About: </strong>
                    {category.category_description}
                  </div>
                  <Button
                    className="edit-category-button"
                    onClick={() => handleEditCategory(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="add-subcategory-button"
                    onClick={() => handleAddSubcategory(category.id)}
                  >
                    Add Subcategory
                  </Button>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="subcategory-list">
                  <div className="subcategory-title">Subcategories</div>
                  <div className="subcategory-scroll">
                  {category.subCategories?.length === 0 && ( <h4 style={{color: '#ada3a3'}}>No subcategories found</h4>)}
                    {category.subCategories?.map((subCategory) => (
                      <div className="sub-category" key={subCategory.id}>
                        {subCategory.sub_category_name}
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </Spin>
      <CategoryModal
        visible={isCategoryModalVisible}
        onClose={() => setIsCategoryModalVisible(false)}
        category={selectedCategory}
        isAddMode={isAddMode}
      />
      <SubcategoryModal
        visible={isSubcategoryModalVisible}
        onClose={() => setIsSubcategoryModalVisible(false)}
        categoryId={currentCategoryId}
      />
    </div>
      
    
    </Container>
  );
};

export default CategoryManagement;
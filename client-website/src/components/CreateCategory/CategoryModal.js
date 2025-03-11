import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Input, Spin } from 'antd';
import { createCategory, updateCategory } from '../../globalStore/Slices/categoriesSlice';

const CategoryModal = ({ visible, onClose, category, isAddMode }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.categories.loading);

  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (isAddMode) {
        form.resetFields();
      } else if (category) {
        form.setFieldsValue({
          category_name: category.category_name,
          category_description: category.category_description
        });
      }
    }
  }, [visible, isAddMode, category, form]);

  const handleSubmit = async (values) => {
    if (!isAddMode && category) {
      await dispatch(updateCategory({ categoryId: category.id, updateData: values }));
    } else {
      await dispatch(createCategory(values));
    }
    onClose();
  };

  return (
    <Modal
      title={isAddMode ? "Create Category" : "Update Category"}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item
            name="category_name"
            label="Category Name"
            rules={[{ required: true, message: 'Please enter category name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category_description"
            label="Category Description"
            rules={[{ required: true, message: 'Please enter category description' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isAddMode ? "Create" : "Update"}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CategoryModal;

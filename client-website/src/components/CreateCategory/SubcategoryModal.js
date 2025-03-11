import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Input, Spin } from 'antd';
import { createSubcategory } from '../../globalStore/Slices/categoriesSlice';

const SubcategoryModal = ({ visible, onClose, categoryId, category}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.categories.loading);

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    await dispatch(createSubcategory({ categoryId, subcategoryData: values }));
    onClose();
  };

  const handleCloseSubcategoryModal = ( ) => {
    Modal.confirm({
      title: "Are you sure you want to cancel?",
      onOk: () => {
        onClose();
      },
    });
  }
 
  return (
    <Modal
      title="Create Subcategory"
      visible={visible}
      maskClosable={false}

      onCancel={handleCloseSubcategoryModal}
      footer={null}
    >
      <Spin spinning={loading}>
        <Form form={form} 
         onFinish={handleSubmit}
         labelCol={{ span: 24 }}
         wrapperCol={{ span: 24 }}>
          <Form.Item name="sub_category_name" label="Subcategory Name" rules={[{ required: true, message: 'Please enter subcategory name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="sub_category_description" label="Subcategory Description" rules={[{ required: true, message: 'Please enter subcategory description' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default SubcategoryModal;

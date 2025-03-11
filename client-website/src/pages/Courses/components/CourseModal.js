import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Input, Spin, Checkbox } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { createCourse, updateCourse } from '../../../services/ApiService/CourseService'; // Replace with your actual path
import { fetchCourses } from '../../../globalStore/Slices/CoursesSlice';

const CourseModal = ({ visible, isAdd, onClose, course, type, searchCoursesId }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.courses.loading);

  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (isAdd) {
        form.resetFields();
      } else if (course) {
        form.setFieldsValue({
          course_name: course?.course_name,
          duration: course?.duration,
          course_fee: course?.course_fee,
          course_salary: course?.course_salary,
          course_timings: course?.course_timings,
          thumbnail_image: course?.thumbnail_image,
          is_premium: course?.is_premium,
          course_description: course?.course_description,
          course_outline: course?.course_outline,
          pre_requisites: course?.pre_requisites,
        });
      }
    }
  }, [visible, isAdd, course, form]);

  const handleSubmit = async (values) => {
    const searchTypeId = { [`${type}Id`]: searchCoursesId };
    const valuesWithSearchId = { ...values, ...searchTypeId };
    const courseId = course?.id;
    const searchCoursesIdLocalStorage = localStorage.getItem('searchCoursesId');
    const typeLocalStorage = localStorage.getItem('type');

    if (!isAdd && course) {
      await updateCourse(valuesWithSearchId, courseId, dispatch);
    } else {
      await createCourse(valuesWithSearchId, dispatch);
    }
    if(searchCoursesIdLocalStorage && typeLocalStorage )
      {
       
        dispatch(fetchCourses({ searchCoursesId: searchCoursesIdLocalStorage, type: typeLocalStorage }));
      }
    onClose();
  };

  return (
    <Modal
      title={isAdd ? "Create Course" : "Update Course"}
      visible={visible}
      onCancel={onClose}
      footer={null}
      maskClosable={false} // This will make the modal background less intrusive
      className="custom-modal" // Assigning a custom class to the modal
    >
      <Spin spinning={loading}>
        <Form
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
            <Button type="primary" htmlType="submit">
              {isAdd ? "Create" : "Update"}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CourseModal;

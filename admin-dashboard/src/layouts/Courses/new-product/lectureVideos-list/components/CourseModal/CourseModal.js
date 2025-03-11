import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Input, Spin, Checkbox } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import PropTypes from 'prop-types';
import { fetchCourses } from 'globalStoreApp/Slices/CoursesSlice';
import { createCourse } from 'services/ApiService/CourseService';
import { updateCourse } from 'services/ApiService/CourseService';
import "../../Courses.css";

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
    const searchTypeId = { [`${type}id`]: searchCoursesId };
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

CourseModal.propTypes = {
    visible: PropTypes.bool, // 'visible' should be a boolean
    isAdd: PropTypes.bool, // 'isAdd' should also be a boolean
    onClose: PropTypes.func, // 'onClose' should be a function
    course: PropTypes.object, // 'course' should be an object (can also specify its shape if needed)
    type: PropTypes.string, // 'type' should be a string
    searchCoursesId: PropTypes.number, // 'searchCoursesId' should be a number
  };



export default CourseModal;

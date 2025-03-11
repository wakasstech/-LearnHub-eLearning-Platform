import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Input, Spin, Checkbox } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  createCourse,
  updateCourse,
} from "../../../services/ApiService/CourseService"; // Replace with your actual path
import { createLecture, updateLecture } from "../../../services/ApiService/LectureService";

const LectureModal = ({visible, isAdd, onClose, lecture, courseId}) => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.courses.loading);

  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (isAdd) {
        form.resetFields();
      } else if (lecture) {
        form.setFieldsValue({
          lecture_name: lecture?.lecture_name,
          duration: lecture?.duration,
          lecture_description: lecture?.lecture_description,
          lecture_outline: lecture?.lecture_outline,
        });
      }
    }
  }, [visible, isAdd, lecture, form]);

  const handleSubmit = async (values) => {
    
 
    const courseID = { courseId: courseId };
    const valuesWithCourseId = { ...values, ...courseID };
    const lectureId = lecture?.id;
    
    if (!isAdd && lecture) {
        
        await updateLecture(valuesWithCourseId, lectureId, dispatch);
    } else {
       
        console.log(valuesWithCourseId)
       await createLecture(valuesWithCourseId, dispatch);
    }

    onClose();
  };

  return (
    <Modal
      title={isAdd ? "Create Course" : "Update Lecture"}
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
            name="lecture_name"
            label="Lecture Name"
            className="custom-label"
            rules={[{ required: true, message: "Please enter lecture name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lecture_duration"
            label="Duration"
            className="custom-label"
            // rules={[
            //   { required: true, message: "Please enter lecture duration" },
            // ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lecture_description"
            label="Lecture Description"
            className="custom-label"
            rules={[
              { required: true, message: "Please enter lecture description" },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="lecture_outline"
            label="Lecture Outline"
            className="custom-label"
            rules={[
              { required: true, message: "Please enter lecture outline" },
            ]}
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

export default LectureModal;

import React, { useState } from "react";
import { Button, Form, Modal, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Input } from "antd";
import { Image } from "antd";
import { Add } from "@mui/icons-material";
import { Box } from "@mui/material";
import { uploadVideoAndContent } from "../../services/ApiService/ApiService";
import "./UploadVideo.css";
import { useDispatch } from "react-redux";

function UploadVideo({ lectureID, loading }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [showModal, setShowModal] = useState(false);
  const [fileVideo, setFileVideo] = useState(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const [videoTitle, setVideoTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const [videoDescription, setVideoDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const beforeUpload = (file) => {
    setFileVideo(file);
    return false;
  };
  const handleRemoveVideo = () => {
    // setFileVideo(null);
  };

  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: false,
    onRemove: handleRemoveVideo,
    beforeUpload,
    beforeUpload,

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },

    showUploadList: {
      showRemoveIcon: true,
      showPreviewIcon: false,
    },
  };

  const { TextArea } = Input;

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <Add />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  //
  const resetFileOriginName = () => {
    // Hide the element with the class "ant-upload-list-item-name"
    const fileSpan = document.querySelector(".ant-upload-list");
    if (fileSpan) {
      fileSpan.style.display = "none";
    }
  };
  const resetState = () => {
    setFileVideo(null);
    resetFileOriginName();
    setFileList([]);
    setVideoTitle("");
    setVideoDescription("");
  };
  const handleModalClose = () => {
    Modal.confirm({
      title: "Are you sure you want to cancel?",
      onOk: () => {
        form.resetFields();
        resetState();
        setShowModal(false);
      },
    });
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleSubmit = async () => {
    // Validate form fields
    alert(lectureID)
    if (!fileVideo) {
      message.error("Please upload a video file.");
      return;
    }

    if (!fileList[0]) {
      message.error("Please upload a video thumbnail image.");
      return;
    }

    if (!videoTitle.trim()) {
      setTitleError("Please enter a video title.");
      return;
    } else {
      setTitleError("");
    }

    if (!videoDescription.trim()) {
      setDescriptionError("Please enter a video description.");
      return;
    } else {
      setDescriptionError("");
    }

    const videoData = {
      videoFile: fileVideo,
      thumbnail: fileList[0].originFileObj, // Extract the file object
      title: videoTitle,
      description: videoDescription,
      lectureId: lectureID
    };
    // Handle submission logic here
    console.log(fileVideo, "videSource");

    // Close the modal after submission
    try {
      const responseData = await uploadVideoAndContent(videoData, dispatch);
      console.log("Response data form Upload Video:", responseData);
    } catch (error) {
      console.error("Error in lead capture:", error);
    } finally {
    }

    resetState();
    setShowModal(false);
  };

  return (
    <>
      <Button style={{background: '#0E162B'}} onClick={handleModalOpen} type="primary" iconPosition={"end"}>
        Upload Video
      </Button>

      <Modal
        open={showModal}
        //  title="Title"
        // onOk={handleOk}
        maskClosable={false}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Return
          </Button>,
          <Button
            disabled={loading}
            key="submit"
            type="primary"
            onClick={handleSubmit}
          >
            Upload
          </Button>,
        ]}
      >
        <div className="modal-content" style={{ marginTop: 30 }}>
          {loading && (
            <div className="loader">
              Please be patient while the video uploads
            </div>
          )}

          <Form form={form}>
            <Form.Item>
              <Dragger {...props} accept=".mp4,video/*" disabled={loading} >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload video
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Form.Item>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <label style={{ fontWeight: 700 }}>Add video thumbImage</label>
              <Form.Item>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  accept="image/*"
                >
                  {fileList.length > 0 ? null : uploadButton}
                </Upload>
              </Form.Item>
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Box>

            <Form.Item
              label="Enter Video Title"
              name="videoTitle"
              rules={[
                { required: true, message: "Please enter the video title" },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                style={{ border: "1px solid gray" }}
              />
            </Form.Item>
            {titleError && <p style={{ color: "red" }}>{titleError}</p>}

            <Form.Item
              label="Enter Video Description"
              name="videoDescription"
              rules={[
                {
                  required: false,
                  message: "Please enter the video description",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <TextArea
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                rows={4}
                style={{ border: "1px solid gray" }}
              />
            </Form.Item>
            {descriptionError && (
              <p style={{ color: "red" }}>{descriptionError}</p>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default UploadVideo;

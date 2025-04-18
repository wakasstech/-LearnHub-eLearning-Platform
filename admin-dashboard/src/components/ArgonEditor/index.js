/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// draft-js
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Custom styles for the MDEditor
import ArgonEditorRoot from "components/ArgonEditor/ArgonEditorRoot";

// Material Dashboard 2 PRO React context
import { useArgonController } from "context";

function MDEditor({ value , handleChange }) {
  const [controller] = useArgonController();
  const { darkMode } = controller;
  const [convertedContent, setConvertedContent] = React.useState(null);
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  React.useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  console.log(value , 'valueeeeeeeeeee')



  useEffect(()=>{
    handleChange({ target: { name: "description", value: convertedContent } })
  } , [convertedContent])

  return (
    <ArgonEditorRoot ownerState={{ darkMode }}>
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
    </ArgonEditorRoot>
  );
}

// Setting default values for the props of MDEditor

// Typechecking props for the MDEditor
MDEditor.propTypes = {
  value: PropTypes.string,
  handleChange : PropTypes.func
};

export default MDEditor;

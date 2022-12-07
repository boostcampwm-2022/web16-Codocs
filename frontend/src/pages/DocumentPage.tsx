import React from 'react';
import Editor from '../components/Editor';
import { EditorHeader } from '../components/editorHeader';

const DocumentPage = () => {
  return (
    <>
      <EditorHeader />
      <Editor />
    </>
  );
};

export default DocumentPage;

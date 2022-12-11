import React, { Suspense } from 'react';
import Editor from '../components/Editor';
import { EditorHeader } from '../components/editorHeader';
import { Spinner } from '../components/spinner';
import { fetchDataFromPath } from '../utils/fetchBeforeRender';

const documentResponse = fetchDataFromPath(window.location.pathname);

const DocumentPage = () => {
  const { title, content } = documentResponse.read();
  return (
    <Suspense fallback={<Spinner />}>
      <EditorHeader titleProp={title} />
      <Editor content={content} />
    </Suspense>
  );
};

export default DocumentPage;

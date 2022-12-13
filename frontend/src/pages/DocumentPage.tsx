import React, { Suspense } from 'react';
import Editor from '../components/Editor';
import { EditorHeader } from '../components/editorHeader';
import { Spinner } from '../components/spinner';
import { fetchDataFromPath } from '../utils/fetchBeforeRender';
import { useQuery } from 'react-query';

const DocumentPage = () => {
  const { data: documentData } = useQuery('document', () => fetchDataFromPath(window.location.pathname), {
    refetchOnWindowFocus: false,
    suspense: true,
    onError: e => {
      console.log(e);
    },
  }); 

  return (
    <Suspense fallback={<Spinner />}>
      <EditorHeader titleProp={documentData.title} />
      <Editor content={documentData.content} />
    </Suspense>
  );
};

export default DocumentPage;

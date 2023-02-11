import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import useDocumentDataQuery from '../query/document/useDocumentDataQuery';
import Editor from '../components/Editor';
import { EditorHeader } from '../components/editorHeader';
import { Spinner } from '../components/spinner';

const DocumentPage = () => {
  const { document_id } = useParams();
  const { data: documentData } = useDocumentDataQuery(document_id as string); 

  return (
    <Suspense fallback={<Spinner />}>
      <EditorHeader titleProp={documentData.title} />
      <Editor content={documentData.content} /> 
    </Suspense>
  );
};

export default DocumentPage;

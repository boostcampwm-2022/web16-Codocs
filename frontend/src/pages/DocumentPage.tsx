import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import useDocumentDataQuery from '../query/document/useDocumentDataQuery';
import { EditorHeader } from '../components/editorHeader';
import { Editor } from '../components/editor/Editor';
import { Spinner } from '../components/spinner';

const DocumentPage = () => {
  const { document_id } = useParams();
  const { data: documentData } = useDocumentDataQuery(document_id as string); 

  return (
    <Suspense fallback={<Spinner />}>
      <EditorHeader documentTitle={documentData.title} />
      <Editor documentContent={documentData.content} /> 
    </Suspense>
  );
};

export default DocumentPage;

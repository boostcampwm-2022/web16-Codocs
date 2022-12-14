import React, { Suspense, useEffect } from 'react';
import Editor from '../components/Editor';
import { EditorHeader } from '../components/editorHeader';
import { Spinner } from '../components/spinner';
import { fetchDataFromPath } from '../utils/fetchBeforeRender';
import { useQuery } from 'react-query';
import useTitle from '../hooks/useTitle';
import socketIOClient, { Socket } from 'socket.io-client';

const DocumentPage = () => {
  const { setTitle } = useTitle();
  const { data: documentData } = useQuery(
    window.location.pathname,
    () => fetchDataFromPath(window.location.pathname),
    {
      refetchOnWindowFocus: false,
      suspense: true,
      onSuccess: (response) => {
        setTitle(response.title);
      },
      onError: (e) => {
        console.log(e);
      }
    }
  );

  return (
    <Suspense fallback={<Spinner />}>
      <EditorHeader />
      <Editor content={documentData.content} />
    </Suspense>
  );
};

export default DocumentPage;

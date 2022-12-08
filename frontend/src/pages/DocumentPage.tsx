import React, { Suspense } from 'react';
import Editor from '../components/Editor';
import { EditorHeader } from '../components/editorHeader';
import { Spinner } from '../components/spinner';
import { fetchDataFromPath } from '../utils/fetchBeforeRender';

// TODO : CRDT Data fetching
const content = fetchDataFromPath(window.location.pathname).read();

const DocumentPage = () => {
  // content.read();
  // TODO : get data
  /*
  타이틀, 그리고 CRDT 내용 가져오는디
  타이틀은 받아오면 전역상태에 넣어주면 끝
  에디터도 그냥 프롭스로 CRDT 넘기면 되지 않을까
  */
  return (
    <>
      <EditorHeader />
      <Suspense fallback={<Spinner />}>
        <Editor content={content} />
      </Suspense>
    </>
  );
};

export default DocumentPage;

import React, { Suspense } from 'react';
import { DocList } from '../docList';
import { Spinner } from '../spinner/Spinner';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';

const docListResponse = fetchDataFromPath('/user-document/recent');

const DocListContainer = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DocList docListResponse={docListResponse} />
    </Suspense>
  );
};

export { DocListContainer };

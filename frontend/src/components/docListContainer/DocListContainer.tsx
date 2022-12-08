import React, { Suspense } from 'react';
import { DocList } from '../docList';
import { Spinner } from '../spinner/Spinner';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';

const response = fetchDataFromPath('/user-document/recent');

const DocListContainer = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DocList response={response} />
    </Suspense>
  );
};

export { DocListContainer };

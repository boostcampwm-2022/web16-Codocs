import React, { Suspense } from 'react';
import { DocList } from '../docList';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';

const response: { read(): any;} = fetchDataFromPath('/document/main');

const DocListContainer = () => {

  return (
    <Suspense fallback={<div>loading.......</div>}>
      <DocList response={response}/>
    </Suspense>
  );
};

export { DocListContainer };

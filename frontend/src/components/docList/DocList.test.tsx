import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DocList } from '../docList';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';

describe('render test for <DocList> and <DocListItem>', () => {
  test('render <DocList>', async () => {
    // render(
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={ <DocList response={fetchDataFromPath('/document/main')} />} />
    //     </Routes>
    //   </BrowserRouter>
    // );
  
    // await waitFor(async () => {
    //   const docListLinks = screen.getAllByRole('link');
    //   expect(docListLinks).toHaveLength(5);
    // });
  });
});
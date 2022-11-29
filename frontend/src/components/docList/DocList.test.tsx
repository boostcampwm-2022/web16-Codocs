import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DocList } from './DocList';

describe('render test for <DocList> and <DocListItem>', () => {
  test('render <DocList>', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <DocList />} />
        </Routes>
      </BrowserRouter>
    );
  
    await waitFor(async () => {
      const docListLinks = screen.getAllByRole('link');
      expect(docListLinks).toHaveLength(2);
    });
  });
});
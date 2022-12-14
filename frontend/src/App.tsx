import React from 'react';
import Router from './Router';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const { REACT_APP_NODE_ENV } = process.env;

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {REACT_APP_NODE_ENV === 'development' ?? <ReactQueryDevtools initialIsOpen={true} />}
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;

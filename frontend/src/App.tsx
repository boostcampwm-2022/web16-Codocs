import React from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { ThemeSwitcher } from './components/themeSwitcher';
import { light, dark } from './theme';
import GlobalStyles from './GlobalStyles';
import Router from './Router';
import useDarkMode from './hooks/useDarkMode';

const { REACT_APP_NODE_ENV } = process.env;
const queryClient = new QueryClient();

const App = () => {
  const {themeMode, toggleTheme} = useDarkMode();
  
  return (
    <QueryClientProvider client={queryClient}>
      {REACT_APP_NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={true} />}
      <RecoilRoot>
        <ThemeProvider theme={themeMode === 'light' ? light : dark}>
          <GlobalStyles />
          <ThemeSwitcher themeMode={themeMode} toggleTheme={toggleTheme}/>
          <Router />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;

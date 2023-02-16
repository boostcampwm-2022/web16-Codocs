import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const GlobalStyles = createGlobalStyle` 
  ${normalize}

    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    html {
      height: 100%;
    }

    #root {
      height: 100%;
    }

    body {
      height: 100%;
      font-family: 'Inter', sans-serif;
      background-color: ${({ theme }) => theme.background};
    }
    
    a {
      text-decoration: none;
      color: inherit;
    }

    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }

    input:focus {
      outline: none;
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }

    .EasyMDEContainer {
      div, p {
        color: ${({ theme }) => theme.text};
        background-color: ${({ theme }) => theme.background};
      }
    }

    .CodeMirror div.CodeMirror-cursor {
      border-left: 1px solid;
      border-color: ${({ theme }) => theme.text};
    }
`;

export default GlobalStyles;

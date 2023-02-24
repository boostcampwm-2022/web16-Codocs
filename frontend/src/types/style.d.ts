import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
      primary: string,
      text: string,
      background: string,
      reverseText: string,
      reverseBackground: string,
      border: string,
      caution: string,
      white: string,
      gray: string,
      black: string,
      interaction: string,
      defaultShadow: string,
  }
}

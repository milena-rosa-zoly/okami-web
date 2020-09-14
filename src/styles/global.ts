import { createGlobalStyle } from 'styled-components';
import colors from './colors';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
  }

  body {
    background: ${colors.dark};
    color: ${colors.light};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }
`;

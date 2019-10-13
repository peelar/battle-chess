import React from 'react';
import './App.css';
import { createGlobalStyle } from 'styled-components';
import Board from './components/Board/Board';
import Interface from './components/Interface/Interface';
import { MOBILE_S, DEFAULT, XL } from './breakpoints';

const GlobalStyle = createGlobalStyle`
  html {
    @media (min-width: ${MOBILE_S}) {
      font-size: 12px;
    }
    @media (min-width: ${DEFAULT}) {
      font-size: 15px;
    }
    @media (min-width: ${XL}) {
      font-size: 18px;
    }
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Interface show />
      <Board />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { Provider } from './context/Context';
import Calculator from './component/Calculator';

function App() {
  return (
    <div id="app_container">
      <Provider>
        <Calculator />
      </Provider>
    </div>
  );
}
export default App;

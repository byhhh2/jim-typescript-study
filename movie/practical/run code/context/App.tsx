import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import MyForm from './MyForm';
import ReducerSample from './ReducerSample';
import { SampleProvider } from './SampleContext';

function App() {
  return (
    <SampleProvider>
      <ReducerSample />
    </SampleProvider>
  );
}
export default App;

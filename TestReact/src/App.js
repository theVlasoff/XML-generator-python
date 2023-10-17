import React from 'react';
import NestedList from './NestedList';
import GenerateForm from './GenerateForm';
import data from './data.json'

function App() {
  return (
    <div>
      <h1>JSON Display Example</h1>
      {<GenerateForm />}
    </div>
  );
}

export default App;

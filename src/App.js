import EditorComponent from './packages/editors/june-slate-editor/index';
import './App.scss';
import React, { useState, useCallback } from "react";

function App() {
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'abc' }]
    },
    {
      type: 'paragraph',
      children: [{ text: 'abcefghijklmn' }]
    }
  ]);
  const onChange = useCallback(function (val) {
    // console.log('onChange', val);
    setValue(val);
  }, []);
  return (
    <div className="app">
        <EditorComponent value={value} onChange={onChange} />
    </div>
  );
}

export default App;

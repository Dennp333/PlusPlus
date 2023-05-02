import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import { serverFunctions } from '../../utils/serverFunctions'

const App = () => {
  const [code, setCode] = useState("");

  useEffect(async () => {
    try {
      const response = await serverFunctions.getSelectedText()
      setCode(response)
    } catch (error) {
      alert(error)
    }
  }, []);

  const replaceText = async () => {
    try {
      const response = await serverFunctions.insertOrReplaceText(code)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <Editor
        value = {code}
        onChange = {(value, event) => setCode(value)}
        language = "python"
        height = "500px"
      />
      <button onClick = {replaceText}>Save</button>
    </>
  );
};

export default App;

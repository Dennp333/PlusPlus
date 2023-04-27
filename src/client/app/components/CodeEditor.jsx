import React, { useState, useEffect } from 'react';
import { serverFunctions } from '../../utils/serverFunctions';

const CodeEditor = () => {
  const [text, setText] = useState([]);

  useEffect(async () => {
    try {
      const response = await serverFunctions.getSelectedText()
      setText(response)
    } catch (error) {
      alert(error)
    }
  }, []);

  const replaceText = async () => {
    try {
      const response = await serverFunctions.insertOrReplaceText(text)
    } catch (error) {
      alert(error)
    }
  }

  const handleChange = (event) => {
    setText(event.target.value)
  }

  return (
    <div>
      <textarea value = {text} onChange = {handleChange}></textarea>
      <button onClick = {replaceText}>Done</button>
    </div>
  );
};

export default CodeEditor;

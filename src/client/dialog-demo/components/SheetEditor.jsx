import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const SheetEditor = () => {
  const [text, setText] = useState([]);

  useEffect(async () => {
    // Call a server global function here and handle the response with .then() and .catch()
    try {
      const response = await serverFunctions.getSelectedText()
      setText(response)
    } catch (error) {
      alert(error)
    }
  }, []);

  const deleteSheet = (sheetIndex) => {
    serverFunctions.deleteSheet(sheetIndex).then(setNames).catch(alert);
  };

  const setActiveSheet = (sheetName) => {
    serverFunctions.setActiveSheet(sheetName).then(setNames).catch(alert);
  };

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

  // You can also use async/await notation for server calls with our server wrapper.
  // (This does the same thing as .then().catch() in the above handlers.)
  const submitNewSheet = async (newSheetName) => {
    try {
      const response = await serverFunctions.addSheet(newSheetName);
      setNames(response);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  return (
    <div>
      <textarea value = {text} onChange = {handleChange}></textarea>
      <button onClick = {replaceText}>Done</button>
    </div>
  );
};

export default SheetEditor;

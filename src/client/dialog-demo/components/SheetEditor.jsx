import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const SheetEditor = () => {
  const [text, setText] = useState([]);

  useEffect(() => {
    // Call a server global function here and handle the response with .then() and .catch()
    serverFunctions.getSelectedText().then(setText).catch(alert);
  }, []);

  const deleteSheet = (sheetIndex) => {
    serverFunctions.deleteSheet(sheetIndex).then(setNames).catch(alert);
  };

  const setActiveSheet = (sheetName) => {
    serverFunctions.setActiveSheet(sheetName).then(setNames).catch(alert);
  };

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
      <textarea value = {text}></textarea>
    </div>
  );
};

export default SheetEditor;

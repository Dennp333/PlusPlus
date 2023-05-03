import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import { serverFunctions } from '../../utils/serverFunctions'
import './app.css'

const App = () => {
  const [code, setCode] = useState("");

  useEffect(async () => {
    try {
      const response = await serverFunctions.getSelectedText()
      setCode(response)
    } catch (error) {
      alert(error)
      await serverFunctions.closeDialog("Closing...")
    }
  }, []);

  const replaceText = async () => {
    try {
      await serverFunctions.insertOrReplaceText(code)
      // closing the dialog is kinda slow - maybe unrender the editor, replace it with a loading screen to reduce confusion
      await serverFunctions.closeDialog("Saving...")
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <Editor
        value = {code}
        onChange = {(value, event) => setCode(value)}
        language = "python"
        height = "500px"
        options = {
          {
            minimap: {enabled: false}
          }
        }
      />
      <div id = "bottom">
        <button onClick = {replaceText}>Save</button>
      </div>
    </div>
  );
};

export default App;

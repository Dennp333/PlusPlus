import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import { serverFunctions } from '../../utils/serverFunctions'
import './app.css'

const App = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(null)
  const [indent, setIndent] = useState(null)
  const [theme, setTheme] = useState(null)

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
      // closing the dialog is kinda slow - maybe unrender the editor, replace it with a loading screen to reduce confusion
      await serverFunctions.insertOrReplaceText(code)
      await serverFunctions.closeDialog("Saving...")
    } catch (error) {
      alert(error)
    }
  }

  const options = {
    minimap: {enabled: false},
    detectIndentation: false,
    tabSize: indent,
    insertSpaces: indent !== 1
  }

  return (
    <div>
      <Editor
        value = {code}
        onChange = {(value, event) => setCode(value)}
        language = {language}
        theme = {theme}
        height = "500px"
        options = {options}
      />
      <div id = "bottom">
        <button onClick = {replaceText}>Save</button>
      </div>
    </div>
  );
};

export default App;

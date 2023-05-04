import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import Menu from './Menu'
import { serverFunctions } from '../../utils/serverFunctions'
import './app.css'

const App = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python") //set default to null in prod
  const [indent, setIndent] = useState(4) //set default to null in prod
  const [theme, setTheme] = useState("light") //set default to null in prod
  const [renderEditor, setRenderEditor] = useState(true)

  useEffect(async () => {
    try {
      const response = await serverFunctions.getSelectedText()
      setCode(response)
    } catch (error) {
      alert(error)
      setRenderEditor(false)
      await serverFunctions.closeDialog("Closing...")
    }
  }, []);

  const replaceText = async () => {
    try {
      setRenderEditor(false)
      await serverFunctions.insertOrReplaceText(code)
      await serverFunctions.closeDialog("Saving...")
    } catch (error) {
      setRenderEditor(true)
      alert(error)
    }
  }

  const options = {
    minimap: {enabled: false},
    detectIndentation: false,
    tabSize: indent > 0 ? indent : null,
    insertSpaces: indent != 0
  }

  return (
    <>
      {renderEditor &&
        <div id = "body">
          <Menu
            language = {language}
            setLanguage = {setLanguage}
            indent = {indent}
            setIndent = {setIndent}
            theme = {theme}
            setTheme = {setTheme}
          />
          <div id = "editor">
            <Editor
              value = {code}
              onChange = {(value, event) => setCode(value)}
              language = {language}
              theme = {theme}
              height = "100%"
              options = {options}
            />
          </div>
          <div id = "bottom">
            <button onClick = {replaceText}>Save</button>
          </div>
        </div>
      }
      {!renderEditor &&
        <div class="loadingContainer">
          <div class="ball1"></div>
          <div class="ball2"></div>
          <div class="ball3"></div>
          <div class="ball4"></div>
        </div>
      }
    </>
  );
};

export default App;

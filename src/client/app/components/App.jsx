import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import Menu from './Menu'
import Button from '@mui/material/Button'
import SaveIcon from '@mui/icons-material/Save'
import { serverFunctions } from '../../utils/serverFunctions'
import '@fontsource/roboto/400.css';
import './app.css'

const App = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(null)
  const [indent, setIndent] = useState(null)
  const [theme, setTheme] = useState(null)
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

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem('docs++.language')
    const storedIndent = window.localStorage.getItem('docs++.indent')
    const storedTheme = window.localStorage.getItem('docs++.theme')
    storedLanguage ? setLanguage(storedLanguage) : setLanguage("python")
    storedIndent ? setIndent(storedIndent) : setIndent(4)
    storedTheme ? setTheme(storedTheme) : setTheme("light")
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardShortcuts);
    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcuts);
    };
  }, [code])

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

  const handleKeyboardShortcuts = (e) => {
    if (e.metaKey || e.ctrlKey) {
      if (e.key == 's') {
        e.preventDefault();
        replaceText()
      }
    }
  }

  const handleLanguageChange = (value) => {
    window.localStorage.setItem('docs++.language', value)
    setLanguage(value)
  }

  const handleIndentChange = (value) => {
    window.localStorage.setItem('docs++.indent', value)
    setIndent(value)
  }

  const handleThemeChange = (value) => {
    window.localStorage.setItem('docs++.theme', value)
    setTheme(value)
  }

  const options = {
    minimap: {enabled: false},
    detectIndentation: false,
    tabSize: indent > 0 ? indent : null,
    insertSpaces: indent != 0
  }

  return (
    <>
      <div id = "body">
        <Menu
          language = {language}
          handleLanguageChange = {handleLanguageChange}
          indent = {indent}
          handleIndentChange = {handleIndentChange}
          theme = {theme}
          handleThemeChange = {handleThemeChange}
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
          {renderEditor &&
            <Button  
              variant = "contained"
              onClick = {replaceText}
              endIcon = {<SaveIcon />}
            >
              Save
            </Button>
          }
          {!renderEditor &&
            <div class="square-holder">
              <div class="square"></div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default App;

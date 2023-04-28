import React, { useState, useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css' //Example style, you can use another
import { serverFunctions } from '../../utils/serverFunctions'

const App = () => {
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

  return (
    <div>
      <Editor
        value={text}
        onValueChange={text => setText(text)}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <button onClick = {replaceText}>Done</button>
    </div>
  );
};

export default App;

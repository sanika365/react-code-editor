import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

const CodeEditor = () => {
  const [code, setCode] = useState(
    `import React from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`
  );

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };
  const handleKeyDown = (event) => {
    const textarea = event.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = code.substring(start, end);

    if (event.key === "Tab") {
      event.preventDefault();
      const textarea = event.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const indentation = "  ";
      const updatedCode =
        code.substring(0, start) + indentation + code.substring(end);

      setCode(updatedCode);

      textarea.selectionStart = textarea.selectionEnd =
        start + indentation.length;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const textarea = event.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // for  Getting the current line's indentation
      const currentLineStart = code.lastIndexOf("\n", start - 1) + 1;
      const currentLine = code.substring(currentLineStart, start);
      const lineIndentation = currentLine.match(/^\s*/)[0];

      const newLineIndentation = "\n" + lineIndentation;
      const updatedCode =
        code.substring(0, start) + newLineIndentation + code.substring(end);

      setCode(updatedCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          start + newLineIndentation.length;
      }, 0);
    }
    if (event.ctrlKey || event.metaKey) {
      let updatedCode;
      switch (event.key) {
        case "(":
          event.preventDefault();
          updatedCode =
            code.substring(0, start) +
            "(" +
            selectedText +
            ")" +
            code.substring(end);
          setCode(updatedCode);
          textarea.selectionStart = start + 1;
          textarea.selectionEnd = end + 1;
          break;
        case "[":
          event.preventDefault();
          updatedCode =
            code.substring(0, start) +
            "[" +
            selectedText +
            "]" +
            code.substring(end);
          setCode(updatedCode);
          textarea.selectionStart = start + 1;
          textarea.selectionEnd = end + 1;
          break;
        case "{":
          event.preventDefault();
          updatedCode =
            code.substring(0, start) +
            "{" +
            selectedText +
            "}" +
            code.substring(end);
          setCode(updatedCode);
          textarea.selectionStart = start + 1;
          textarea.selectionEnd = end + 1;
          break;
        case "'":
          event.preventDefault();
          updatedCode =
            code.substring(0, start) +
            "'" +
            selectedText +
            "'" +
            code.substring(end);
          setCode(updatedCode);
          textarea.selectionStart = start + 1;
          textarea.selectionEnd = end + 1;
          break;
        case '"':
          event.preventDefault();
          updatedCode =
            code.substring(0, start) +
            '"' +
            selectedText +
            '"' +
            code.substring(end);
          setCode(updatedCode);
          textarea.selectionStart = start + 1;
          textarea.selectionEnd = end + 1;
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className='code-editor'>
      <Highlight theme={themes.dracula} code={code} language='jsx'>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{ ...style, textAlign: "left", margin: 0, padding: "10px" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span className='line-number'>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <textarea
        value={code}
        onChange={handleCodeChange}
        onKeyDown={handleKeyDown}
        className='code-input'
      />
    </div>
  );
};

export default CodeEditor;

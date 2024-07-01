import React from "react";
import CodeEditor from "./CodeEditor";
import "./App.css";
  const goToGitHub = () => {
    window.location.href = "https://github.com/Sanika365"; 
  };
function App() {
  return (
    <div className='App'>
      <h1>React Simple Code Editor</h1>
      <p className="description">A simple no-frills code editor with syntax highlighting.</p>
      <button onClick={goToGitHub} className='github-button'>
        GitHub
      </button>
      <CodeEditor />
    </div>
  );
}

export default App;

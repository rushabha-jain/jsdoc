import React, { useRef } from "react";
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import monaco from "monaco-editor";
import prettier from "prettier";
import babelParser from "prettier/parser-babel";
import "./CodeEditor.css";

export interface ICodeEditorProps {
  code: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ code, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editorRef.current = editor;
  }

  function handleEditorChange(
    value: string | undefined,
    event: monaco.editor.IModelContentChangedEvent
  ) {
    if (value) onChange(value);
  }

  function formatCode() {
    // 1. Get the code
    const unformatted:
      | string
      | undefined = editorRef.current?.getModel()?.getValue();
    if (unformatted) {
      // 2. Format the code
      const formatted = prettier.format(unformatted, {
        parser: "babel", // You specify which parser to use
        plugins: [babelParser], // You add the bundle of the parser
        singleQuote: true
      });
      // 3. Set the code
      onChange(formatted);
    }
  }

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={formatCode}
      >
        Format
      </button>
      <MonacoEditor
        value={code}
        height="100%"
        language="javascript"
        theme="vs-dark"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false }, // Remove the overview scroll feature
          folding: false, // Remove space between line number and code
          lineNumbersMinChars: 3,
          wordWrap: "on", // Will wrap the word if line execeeds the width
          tabSize: 2 // Will override the tab with 4 spaces to 2 spaces
        }}
      />
    </div>
  );
};

export default CodeEditor;

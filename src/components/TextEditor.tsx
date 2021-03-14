import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./TextEditor.css";

const TextEditor: React.FC = () => {
  // Contains the data inside the md editor
  const [value, setValue] = React.useState("**Hello world!!!**");

  const editorRef = useRef<HTMLDivElement | null>(null);

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      console.log(": editorRef Ref :");
      console.dir(editorRef.current);
      console.log(": Event Target :");
      console.dir(event.target);
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={editorRef} className="text-editor">
        <MDEditor value={value} onChange={v => setValue(v || "")} />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)} className="card">
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;

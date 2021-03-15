import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./TextEditor.css";
import { Cell, updateCell } from "../state";
import { useDispatch } from "react-redux";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const dispatch = useDispatch();

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
        <MDEditor
          value={cell.content}
          onChange={v => dispatch(updateCell(cell.id, v || ""))}
        />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)} className="card">
      <div className="card-content">
        <MDEditor.Markdown source={cell.content} />
      </div>
    </div>
  );
};

export default TextEditor;
